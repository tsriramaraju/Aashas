require('dotenv').config();
module.exports = {
  auth: process.env.AUTH_MONGO_URL,
  users: process.env.USERS_MONGO_URL,
  designer: process.env.DESIGNER_MONGO_URL,
  notification: process.env.NOTIFICATION_MONGO_URL,
  products: process.env.PRODUCTS_MONGO_URL,
  orders: process.env.ORDERS_MONGO_URL,
};
