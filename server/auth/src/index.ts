import { ConnectionOptions } from 'mongoose';
import { app } from './app';
import { connectDB, natsWrapper } from '@aashas/common';
import config from './config';

const start = async () => {
  if (!config.jwtSecret) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!config.mongoURL) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!config.natsClusterID || !config.natsClientID || !config.natsURL) {
    throw new Error('NATS config variables must be defined');
  }

  const options: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  try {
    await natsWrapper.connect(
      config.natsClusterID,
      config.natsClientID,
      config.natsURL
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await connectDB(config.mongoURL, options);
  } catch (error) {
    console.log(error);
    process.exit();
  }

  app.listen(config.port, () => {
    console.log(`Listening in port ${config.port}`.green);
  });
};

start();
