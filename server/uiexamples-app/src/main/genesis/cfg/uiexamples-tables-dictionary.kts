/**
  * This file defines the entities (or tables) for the application.  
  * Entities aggregation a selection of the universe of fields defined in 
  * {app-name}-fields-dictionary.kts file into a business entity.  
  *
  * Note: indices defined here control the APIs available to the developer.
  * For example, if an entity requires lookup APIs by one or more of its attributes, 
  * be sure to define either a unique or non-unique index.

  * Full documentation on tables may be found here >> https://docs.genesis.global/docs/develop/server-capabilities/data-model/

 */

tables {
  table(name = "ENTITY", id = 11_000, audit = details(id = 11_500, sequence = "EA")) {
    field("ENTITY_DESCRIPTION", STRING).notNull()
    field("ENTITY_NAME", STRING).notNull()

    primaryKey("ENTITY_NAME")

  }
  table(name = "CLIENT", id = 11_001, audit = details(id = 11_501, sequence = "CA")) {
    field("CLIENT_DESCRIPTION", STRING).notNull()
    field("CLIENT_NAME", STRING).notNull()

    primaryKey("CLIENT_NAME")

  }
  table(name = "TRADE", id = 11_002, audit = details(id = 11_502, sequence = "TA")) {
    field("TRADE_ID", STRING).sequence("TR")
    field("CLIENT_NAME", STRING).notNull()
    field("ENTITY_NAME", STRING).notNull()
    field("ENTRY_DATETIME", DATETIME).notNull()
    field("NOTIONAL", DOUBLE).notNull()
    field("RATE", DOUBLE).notNull()
    field("SETTLEMENT_DATE", DATE).notNull()
    field("SIDE", ENUM("Sell","Buy")).default("Buy").notNull()
    field("SOURCE_CURRENCY", STRING).notNull()
    field("STATUS", ENUM("New","Amended","Cancelled")).default("New").notNull()
    field("TARGET_CURRENCY", STRING).notNull()
    field("VERSION", INT).notNull()

    primaryKey("TRADE_ID")

  }
  table(name = "FX_RATE", id = 11_008, audit = details(id = 11_019, sequence = "FR")) {
    field("BID_RATE", DOUBLE).notNull()
    field("OFFER_RATE", DOUBLE).notNull()
    field("SOURCE_CURRENCY", STRING).notNull()
    field("TARGET_CURRENCY", STRING).notNull()

    primaryKey("SOURCE_CURRENCY","TARGET_CURRENCY")

  }

  table(name= "INDEX", id= 11_012) {
    field("INDEX_NAME", STRING).notNull()

    primaryKey("INDEX_NAME")
  }

  table(name = "INDEX_RATE", id = 11_009, audit = details(id = 11_020, sequence = "IR")) {
    field("INDEX", STRING).notNull()
    field("DATE", DATE).notNull()
    field("RATE", DOUBLE).notNull()

    primaryKey("INDEX","DATE")

  }

  table(name = "INSTRUMENT_PRICE_HISTORY", id = 11_010) {
    field("INSTRUMENT_ID", STRING)
    field("MARKET_DATE", DATE)
    field("OPEN_PRICE", DOUBLE)
    field("CLOSE_PRICE", DOUBLE)
    field("HIGH_PRICE", DOUBLE)
    field("LOW_PRICE", DOUBLE)

    primaryKey("INSTRUMENT_ID", "MARKET_DATE")
  }

  table (name="INSTRUMENT", id = 11_011) {
    field(name = "INSTRUMENT_ID", STRING) // Warning: Defined as both nullable and non-nullable in source
    field(name = "INSTRUMENT_CODE", STRING)
    field(name = "MARKET_ID", STRING)
    field(name = "COUNTRY_CODE", STRING)
    field(name = "CURRENCY_ID", STRING)
    field(name = "ASSET_CLASS", STRING)
    field(name = "NAME", STRING)

    primaryKey("INSTRUMENT_ID")
  }

  // TODO 2. Add further tables you wish to add to the application here. See the comments at the top of this file for learning and guidance.
}
