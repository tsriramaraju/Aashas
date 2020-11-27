import { keys } from '../config/keys';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connection, connect, Types } from 'mongoose';

import {
  CustomProductDoc,
  DesignerDoc,
  OrderDoc,
  ProductDoc,
  salesBannerAttrs,
  SalesBannerDoc,
} from '@aashas/common';
import { Designer } from '../models/Designer';

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

// global.createDesigner=async()=>{

//   const DesignerDoc= await Designer.build({

//   }).save()

// }
