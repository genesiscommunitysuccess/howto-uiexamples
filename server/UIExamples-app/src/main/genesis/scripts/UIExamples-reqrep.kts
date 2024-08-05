/**
  * This file defines request-replies of the application. 
  * Request-Replies provide snapshot data from a table or view in response to a request from the front end.
  * Once the response is received, the transaction is over (unlike a Data Server, which stays connected to the client and pushes updates)

  * Full documentation on request server may be found here >> https://learn.genesis.global/docs/server/request-server/introduction/

 */

requestReplies {
  requestReply(ENTITY)
  requestReply(ENTITY_AUDIT)
  requestReply(CLIENT)
  requestReply(CLIENT_AUDIT)
  requestReply(TRADE)
  requestReply(TRADE_AUDIT)

  //TODO 4.a Add authorisation, where clauses, indices and restrict fields on the generated request server queries as required by the application.
  //TODO 4.b Add further request server queries (including custom request servers) as needed by the application here. See the comments at the top of this file for learning and guidance.
}