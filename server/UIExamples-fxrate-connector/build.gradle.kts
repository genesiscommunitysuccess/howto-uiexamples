dependencies {
    implementation("global.genesis:genesis-process:${properties["genesisVersion"]}")
    implementation("org.apache.kafka:kafka-clients:${properties["kafkaClientVersion"]}")
    implementation(project(path = ":UIExamples-dictionary-cache", configuration = "codeGen"))
}

description = "UIExamples-fxrate-connector"
