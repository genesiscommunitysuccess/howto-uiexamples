package global.genesis.UIExamples.kafka;

import com.google.inject.Inject;
import global.genesis.commons.annotation.Module;
import global.genesis.db.entity.UpsertResult;
import global.genesis.db.rx.entity.multi.RxEntityDb;
import global.genesis.gen.dao.FxRate;
import global.genesis.gen.dao.builder.FxRateBuilder;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Named;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicBoolean;

@Module
public class FxRateKafkaConsumer {

    private static final Logger LOG = LoggerFactory.getLogger(FxRateKafkaConsumer.class);

    final String fxRatesTopic;
    final KafkaConsumer<String, String> consumer;
    private final AtomicBoolean shutdown;
    private final CountDownLatch shutdownLatch;

    private final RxEntityDb rxEntityDb;

    @Inject
    public FxRateKafkaConsumer(@Named("KAFKA_BOOTSTRAP_SERVER") String bootstrapServer,
                               @Named("KAFKA_FX_RATES_TOPIC_NAME") String fxRatesTopic,
                               //@Named("ALM_KAFKA_CONSUMER_GROUP") String fxRatesConsumerGroup,
                               final RxEntityDb entityDb) throws UnknownHostException {

        /////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////
        //Ideally this value would be collected in the constructor (see commented line above)
        //Should be from a variable defined in the system-definition.kts file
        //Should not be from calling this function which simply gets the host name
        String fxRatesConsumerGroup = InetAddress.getLocalHost().getHostName();
        /////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////

        this.rxEntityDb = entityDb;
        this.fxRatesTopic = fxRatesTopic;
        this.shutdown = new AtomicBoolean(false);
        this.shutdownLatch = new CountDownLatch(1);
        KafkaConsumerFactory factory = new KafkaConsumerFactory(bootstrapServer, fxRatesConsumerGroup);
        consumer = factory.generateKafkaConsumer();

    }

    @PostConstruct
    public void init() {
        LOG.info("Starting consumer for fx rates.");
        processFxRates();
    }

    public void processFxRates() {

        consumer.subscribe(List.of(this.fxRatesTopic));

        Runnable consumerRun = () -> {
            try {
                while (!shutdown.get()) {
                    ConsumerRecords<String, String> records = consumer.poll(Duration.of(1, ChronoUnit.SECONDS));
                    if (!records.isEmpty()) {
                        LOG.info("Consumed {} records.", records.count());
                        records.forEach(this::process);
                    }
                }
            } finally {
                LOG.info("Stopping consumer for fx rates.");
                consumer.close();
                shutdownLatch.countDown();
            }
        };

        Thread consumerThread = new Thread(consumerRun);
        consumerThread.start();

    }

    public void shutdown() throws InterruptedException {
        shutdown.set(true);
        shutdownLatch.await();
    }

    private void process(ConsumerRecord<String, String> record) {

        FxRateBuilder fxratesBuilder = buildFxRateFromRecord(record);

        if (fxratesBuilder == null) return;

        try {
            UpsertResult<FxRate> fxratesUpsertResult = rxEntityDb.upsert(fxratesBuilder.build()).blockingGet();
            LOG.debug("Fxrates inserted to db: {}", fxratesUpsertResult.getRecord());
        } catch (Exception e) {
            LOG.error("Error during fx-rate insert/update. ", e);
        }

    }

    @Nullable
    private static FxRateBuilder buildFxRateFromRecord(ConsumerRecord<String, String> record) {
        final double bidRate;
        final double offerRate;
        final String toCcy;
        final String fromCcy;
        try {
            String[] values = record.value().split(",");
            bidRate = Double.parseDouble(values[0]);
            offerRate = Double.parseDouble(values[1]);
            fromCcy = values[2];
            toCcy = values[3];
        } catch (Exception e) {
            LOG.error("Error parsing fx-rate from kafka. Record value is {}", record.value(), e);
            return null;
        }

        FxRateBuilder fxratesBuilder = new FxRateBuilder();
        fxratesBuilder.setBidRate(bidRate);
        fxratesBuilder.setOfferRate(offerRate);
        fxratesBuilder.setSourceCurrency(fromCcy);
        fxratesBuilder.setTargetCurrency(toCcy);
        return fxratesBuilder;
    }

}
