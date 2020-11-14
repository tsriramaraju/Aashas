/**
 * Exported ENV variables as a object for better code suggestions. The environment variables assigned as server-secret in kubernetes from env.txt file
 *
 * kubectl create secret generic server-secrets --from-env-file=./env.tx
 */

export const keys = {
  port: process.env.AUTH_PORT,

  mongoURL: process.env.AUTH_MONGO_URL,

  jwtSecret: process.env.JWT_SECRET,

  natsClusterID: process.env.NATS_CLUSTER_ID,

  natsURL: process.env.NATS_URL,

  natsClientID: process.env.AUTH_NATS_CLIENT_ID,

  googleClientID: process.env.GOOGLE_CLIENT_ID,

  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

  facebookClientID: process.env.FACEBOOK_CLIENT_ID,

  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
};
