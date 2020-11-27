import { keys } from '../config/keys';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connection, connect, Types } from 'mongoose';

import {
  authType,
  CustomProductDoc,
  femaleType,
  kidsType,
  maleType,
  OrderDoc,
  paymentModes,
  paymentStatus,
  ProductDoc,
  size,
  verification,
} from '@aashas/common';
import { generateJWT } from '../utils';

import { v4 } from 'uuid';

jest.mock('@aashas/common/build/loaders/natsWrapper', () => {
  return {
    natsWrapper: {
      client: {
        publish: jest
          .fn()
          .mockImplementation(
            (subject: string, data: string, callback: () => void) => {
              callback();
            }
          ),
      },
    },
  };
});

declare global {
  namespace NodeJS {
    interface Global {
      userLogin(): Promise<string>;
      adminLogin(): Promise<string>;
      createProduct(): Promise<ProductDoc>;
      createCustomProduct(): Promise<CustomProductDoc>;
      createOrder(userId: Types.ObjectId): Promise<OrderDoc>;
    }
  }
}

let mongo: any;
beforeAll(async () => {
  keys.jwtSecret = 'secret';

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  process.env.JWT_SECRET = 'This almost had me ';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
});

beforeEach(async () => {
  const collections = await connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await connection.close();
});
