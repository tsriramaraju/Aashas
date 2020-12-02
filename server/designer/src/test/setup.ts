import { keys } from '../config/keys';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connection, connect, Types } from 'mongoose';

import { DesignerDoc, SalesBannerDoc, verification } from '@aashas/common';
import { Designer } from '../models/Designer';
import { generateJWT } from '../utils';
import { bannerData } from '../dummy data/bannerData';
import { SalesBanner } from '../models/SalesBanner';

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
      createDesigner(): Promise<DesignerDoc>;
      createSalesBanner(): Promise<SalesBannerDoc>;
      userLogin(): string;
      adminLogin(): string;
    }
  }
}

const userId = Types.ObjectId();

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

global.createDesigner = async () => {
  const designer = await Designer.build({
    id: userId,
    bio: 'this is bio',
    email: 'john@admin.com',
    image:
      'https://avatars2.githubusercontent.com/u/13117711?s=460&u=380dbcf3b070c32863b79fd4596678b2440ba78b&v=4',
    mobile: 1234567891,
    name: 'John the admin',
  }).save();

  return designer;
};
global.createSalesBanner = async () => {
  const banner = await SalesBanner.build(bannerData).save();

  return banner;
};

global.adminLogin = () => {
  const email = 'john@doe.com';
  const name = 'john doe';
  const token = generateJWT({
    id: userId,
    name,
    email,
    emailVerified: verification.yes,
    mobileVerified: verification.yes,
    isAdmin: true,
  });

  return token;
};
global.userLogin = () => {
  const email = 'john@doe.com';
  const name = 'john doe';
  const token = generateJWT({
    id: Types.ObjectId(),
    name,
    email,
    emailVerified: verification.yes,
    mobileVerified: verification.yes,
    isAdmin: false,
  });

  return token;
};
