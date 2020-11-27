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
import { User } from '../models/Users';

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
global.userLogin = async () => {
  const email = `${v4()}@test.com`;
  const password = 'This is secret';
  const name = 'john doe';

  const mobile = Math.random();

  const user = await User.build({
    id: Types.ObjectId(),
    name,
    isAdmin: false,
    authType: authType.email,
    email,
    mobile,
  }).save();

  const token = generateJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: verification.yes,
    mobileVerified: verification.yes,
  });

  return token;
};
global.adminLogin = async () => {
  const email = 'john@doe.com';
  const password = 'This is secret';
  const name = 'john doe';

  const user = await new User({
    email,
    password,
    name,
    isAdmin: true,

    authType: authType.email,
  }).save();

  const token = generateJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: verification.yes,
    mobileVerified: verification.yes,
  });

  return token;
};
