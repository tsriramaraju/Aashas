import { ConnectionOptions } from 'mongoose';
import { app } from './app';
import { connectDB, natsWrapper } from '@aashas/common';
import { keys } from './config/keys';
import { AccountCreatedListener } from './events';

const start = async () => {
  /**
   * check for mandatory env variables and then start the server
   */
  if (!keys.jwtSecret) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!keys.mongoURL) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!keys.natsClusterID || !keys.natsClientID || !keys.natsURL) {
    throw new Error('NATS keys variables must be defined');
  }

  const options: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  try {
    await natsWrapper.connect(
      keys.natsClusterID,
      keys.natsClientID,
      keys.natsURL
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await connectDB(keys.mongoURL, options);
  } catch (error) {
    console.log(error);
    process.exit();
  }

  new AccountCreatedListener(natsWrapper.client).listen();

  app.listen(keys.port, () => {
    console.log(`Listening in port ${keys.port}`.green);
  });
};

start();
