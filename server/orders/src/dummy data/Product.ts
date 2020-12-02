import {
  categories,
  femaleType,
  kidsType,
  maleType,
  productAttrs,
  size,
} from '@aashas/common';

export const maleProductData: productAttrs = {
  title: 'males casuals',
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
  gender: 'male',
  keywords: ['dress'],
  quantity: 120,
  trending: false,
  outfit: {
    occasion: {
      casual: 'Jackets',
      groom: 'Kurta pyjama',
    },
    type: categories.men,
  },
};

export const femaleProductData: productAttrs = {
  title: 'female casuals',
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
  outfit: {
    occasion: {
      bridal: 'Kurtas',
      casual: 'Kurtas',
    },
    type: categories.women,
  },
};

export const kidsProductData: productAttrs = {
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
  outfit: {
    occasion: {
      birthday: 'Kurtas',
      weddings: 'Jackets',
    },
    type: categories.kids,
  },
};
