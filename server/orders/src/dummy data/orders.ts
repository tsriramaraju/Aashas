import { categories, paymentModes, paymentStatus, size } from '@aashas/common';
import { Types } from 'mongoose';

export const orderData = {
  address: {
    name: 'office 23',
    house: 'FF-012, PentHouse',
    location: 'Sparks Villa',
    street: 'NEw hamster Road',
    pin: 530013,
    city: 'USA',
    state: 'AP',
  },
  items: [
    {
      outfit: {
        type: categories.kids,
        occasion: {
          party: 'sherwani',
        },
      },
      prodId: Types.ObjectId(),
      title: 'kids casuals',
      description:
        "A story woven from the twines of Crimson petals dropping down from the roof on to an earthy wall – a beautiful sight captured at the dawn. A childhood memory.\nDesigner/'s love for bougainvillea and the childhood image has inspired this collection. Each design is an untold story and a hand crafted bridal, fusion and luxury pret wear. The hand painted flowers and twines have been translated into prints and  embroidery creating a vintage look in layers. This is a bright, , fun collection ranging from pastel to dark colours.",
      size: size.L,
      price: 98.15,
      color: 'green red blue',
      images: [
        'https://5.imimg.com/data5/XY/CL/MY-2/fgfgg-jpg-500x500.jpg',
        'https://5.imimg.com/data5/QT/NY/MY-42821634/designer-new-style-garara-wedding-wear-suit-500x500.jpg',
        'https://img2.exportersindia.com/product_images/bc-full/dir_112/3354894/stylish-wedding-wear-lehenga-1497779736-3071612.jpeg',
      ],
      discount: 12,
      inOffer: true,
    },
  ],
  orderDate: Date.now().toString(),
  payment: {
    status: paymentStatus.pending,
    method: paymentModes.UPI,
  },
  price: {
    discountPrice: 12,
    productTotal: 23,
    shippingCharges: 41,
    tax: 12,
    totalAfterDiscount: 52,
    totalAmount: 12,
  },
  status: 'working on it',
  userId: Types.ObjectId(),
};

export const priceData = {
  discountPrice: 12,
  productTotal: 23,
  shippingCharges: 41,
  tax: 12,
  totalAfterDiscount: 52,
  totalAmount: 12,
};

export const itemsData = {
  outfit: {
    type: categories.kids,
    occasion: {
      party: 'sherwani',
    },
  },
  prodId: Types.ObjectId(),
  title: 'kids casuals',
  description:
    "A story woven from the twines of Crimson petals dropping down from the roof on to an earthy wall – a beautiful sight captured at the dawn. A childhood memory.\nDesigner/'s love for bougainvillea and the childhood image has inspired this collection. Each design is an untold story and a hand crafted bridal, fusion and luxury pret wear. The hand painted flowers and twines have been translated into prints and  embroidery creating a vintage look in layers. This is a bright, , fun collection ranging from pastel to dark colours.",
  size: size.L,
  price: 98.15,
  color: 'green red blue',
  images: [
    'https://5.imimg.com/data5/XY/CL/MY-2/fgfgg-jpg-500x500.jpg',
    'https://5.imimg.com/data5/QT/NY/MY-42821634/designer-new-style-garara-wedding-wear-suit-500x500.jpg',
    'https://img2.exportersindia.com/product_images/bc-full/dir_112/3354894/stylish-wedding-wear-lehenga-1497779736-3071612.jpeg',
  ],
  discount: 12,
  inOffer: true,
};

export const addressData = {
  name: 'office 23',
  house: 'FF-012, PentHouse',
  location: 'Sparks Villa',
  street: 'NEw hamster Road',
  pin: 530013,
  city: 'USA',
  state: 'AP',
};
