/**
 * Exported ENV variables as a object for better code suggestions. The environment variables assigned as server-secret in kubernetes from env.txt file
 *
 * kubectl create secret generic server-secrets --from-env-file=./env.tx
 */

export const keys = {
  port: process.env.PRODUCTS_PORT,

  mongoURL: process.env.PRODUCTS_MONGO_URL,

  jwtSecret: process.env.JWT_SECRET,

  natsClusterID: process.env.NATS_CLUSTER_ID,

  natsURL: process.env.NATS_URL,

  natsClientID: process.env.NATS_CLIENT_ID,

  algoliaID: process.env.ALGOLIA_APP_ID,

  algoliaKey: process.env.ALGOLIA_API_KEY,
};
