import { keys } from '../config/keys';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connection, connect, Types } from 'mongoose';
import { User } from '../models/Users';
import {
  authType,
  categories,
  CustomProductDoc,
  femaleType,
  kidsType,
  maleType,
  OrderDoc,
  outfit,
  paymentModes,
  paymentStatus,
  ProductDoc,
  size,
  verification,
} from '@aashas/common';
import { generateJWT } from '../utils';
import { Product } from '../models/Products';
import { CustomProduct } from '../models/CustomProducts';
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
      createProduct(outfit?: outfit): Promise<ProductDoc>;
      createCustomProduct(): Promise<CustomProductDoc>;
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

global.createProduct = async (outfit?: outfit) => {
  const product = await Product.build({
    title: 'kids casuals',
    description:
      "A story woven from the twines of Crimson petals dropping down from the roof on to an earthy wall – a beautiful sight captured at the dawn. A childhood memory.\nDesigner/'s love for bougainvillea and the childhood image has inspired this collection. Each design is an untold story and a hand crafted bridal, fusion and luxury pret wear. The hand painted flowers and twines have been translated into prints and  embroidery creating a vintage look in layers. This is a bright, , fun collection ranging from pastel to dark colours.",
    size: [size.L, size.M, size.S],
    price: 98.15,
    color: 'green red blue',
    images: [
      'https://5.imimg.com/data5/XY/CL/MY-2/fgfgg-jpg-500x500.jpg',
      'https://5.imimg.com/data5/QT/NY/MY-42821634/designer-new-style-garara-wedding-wear-suit-500x500.jpg',
      'https://img2.exportersindia.com/product_images/bc-full/dir_112/3354894/stylish-wedding-wear-lehenga-1497779736-3071612.jpeg',
    ],
    designerCollection: false,
    isNewProduct: false,
    gender: 'female',
    keywords: ['dress'],
    quantity: 120,
    trending: false,
    outfit: outfit || {
      occasion: {
        birthday: 'Kurtas',
        bridesmaid: 'Kurtas',
      },
      type: categories.kids,
    },
  }).save();
  return product;
};
global.createCustomProduct = async () => {
  const product = await CustomProduct.build({
    title: 'kids casuals',
    description:
      "A story woven from the twines of Crimson petals dropping down from the roof on to an earthy wall – a beautiful sight captured at the dawn. A childhood memory.\nDesigner/'s love for bougainvillea and the childhood image has inspired this collection. Each design is an untold story and a hand crafted bridal, fusion and luxury pret wear. The hand painted flowers and twines have been translated into prints and  embroidery creating a vintage look in layers. This is a bright, , fun collection ranging from pastel to dark colours.",
    size: [size.L, size.M, size.S],
    price: 98.15,
    color: 'green red blue',
    images: [
      'https://5.imimg.com/data5/XY/CL/MY-2/fgfgg-jpg-500x500.jpg',
      'https://5.imimg.com/data5/QT/NY/MY-42821634/designer-new-style-garara-wedding-wear-suit-500x500.jpg',
      'https://img2.exportersindia.com/product_images/bc-full/dir_112/3354894/stylish-wedding-wear-lehenga-1497779736-3071612.jpeg',
    ],
    refImages: [
      'https://5.imimg.com/data5/XY/CL/MY-2/fgfgg-jpg-500x500.jpg',
      'https://5.imimg.com/data5/QT/NY/MY-42821634/designer-new-style-garara-wedding-wear-suit-500x500.jpg',
      'https://img2.exportersindia.com/product_images/bc-full/dir_112/3354894/stylish-wedding-wear-lehenga-1497779736-3071612.jpeg',
    ],
    designerCollection: false,
    isNewProduct: false,
    gender: 'female',
    keywords: ['dress'],
    quantity: 120,
    trending: false,
    outfit: {
      occasion: {
        birthday: 'Kurtas',
        bridesmaid: 'Kurtas',
      },
      type: 1,
    },
  }).save();
  return product;
};
