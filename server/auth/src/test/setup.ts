import { hashPassword } from './../utils/hashPassword';
import { AccountDoc, authType } from '@aashas/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection } from 'mongoose';
import { keys } from '../config/keys';
import { v4 } from 'uuid';
import request from 'supertest';
import { app } from '../app';
import { Account } from '../models/Accounts';
import { generateJWT } from '../utils/generateJWT';

declare global {
  namespace NodeJS {
    interface Global {
      register(
        emailData?: string,
        mobileData?: number
      ): Promise<AccountDoc | undefined>;
      userLogin(): Promise<string>;
      adminLogin(): Promise<string>;
    }
  }
}

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

let mongo: any;
beforeAll(async () => {
  keys.jwtSecret = 'This almost had me';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  process.env.JWT_SECRET = 'This almost had me';

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
afterEach(() => {
  jest.clearAllMocks();
});
global.userLogin = async () => {
  const email = 'john@doe.com';
  const password = 'This is secret';
  const name = 'john doe';
  const user = await new Account({
    email,
    password,
    name,
    isAdmin: false,
    lastLogin: Date.now(),
    authType: authType.email,
  }).save();

  const token = generateJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    mobileVerified: user.mobileVerified,
    isAdmin: user.isAdmin,
  });

  return token;
};
global.adminLogin = async () => {
  const email = 'john@doe.com';
  const password = 'This is secret';
  const name = 'john doe';

  const user = await new Account({
    email,
    password,
    name,
    isAdmin: true,
    lastLogin: Date.now(),
    authType: authType.email,
  }).save();

  const token = generateJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    mobileVerified: user.mobileVerified,
    isAdmin: user.isAdmin,
  });

  return token;
};

global.register = async (emailData?: string, mobileData?: number) => {
  try {
    const email = emailData || `${v4()}@test.com`;
    const password = 'this is secret';
    const mobile = mobileData || Math.floor(1000000000 + Math.random() * 8000);
    const name = v4();

    const hash = await hashPassword(password);

    return await new Account({
      email,
      name,
      password: hash,
      mobile,
      authType: authType.email,
      lastLogin: Date.now(),
    }).save();
  } catch (error) {
    console.log(error);
  }
};
