const mongoose = require('mongoose');
const keys = require('./keys');
const clearDb = async () => {
  await mongoose.connect(keys.auth);
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoose.connect(keys.designer);
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoose.connect(keys.notification);
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoose.connect(keys.orders);
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoose.connect(keys.products);
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoose.connect(keys.users);
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

// console.log(process.env.AUTH_MONGO_URL);
clearDb();
