import { keys } from '../config/keys';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connection, connect, Types } from 'mongoose';
import {
  categories,
  CustomProductDoc,
  OrderDoc,
  outfit,
  paymentModes,
  paymentStatus,
  ProductDoc,
  size,
  verification,
} from '@aashas/common';
import { generateJWT } from '../utils';

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
    }
  }
}

let mongo: any;
beforeAll(async () => {
  keys.jwtSecret = 'This almost had me ';
  keys.algoliaID = 'This almost had me ';
  keys.algoliaKey = 'This almost had me ';
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

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await mongo.stop();
  await connection.close();
});
