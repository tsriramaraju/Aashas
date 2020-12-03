import {
  categories,
  customProductRequestAttrs,
  customProductsAttrs,
  size,
  verification,
} from '@aashas/common';

export const customRequestData: customProductRequestAttrs = {
  refImages: ['https://5.imimg.com/data5/XY/CL/MY-2/fgfgg-jpg-500x500.jpg'],
  status: verification.pending,
  gender: 'male',
};

export const customBuildData: customProductsAttrs = {
  title: 'males casuals',
  description:
    "A story woven from the twines of Crimson petals dropping down from the roof on to an earthy wall – a beautiful sight captured at the dawn. A childhood memory.\nDesigner/'s love for bougainvillea and the childhood image has inspired this collection. Each design is an untold story and a hand crafted bridal, fusion and luxury pret wear. The hand painted flowers and twines have been translated into prints and  embroidery creating a vintage look in layers. This is a bright, , fun collection ranging from pastel to dark colours.",

  color: 'green red blue',
  refImages: ['https://5.imimg.com/data5/XY/CL/MY-2/fgfgg-jpg-500x500.jpg'],
  status: verification.yes,
  images: [
    'https://5.imimg.com/data5/XY/CL/MY-2/fgfgg-jpg-500x500.jpg',
    'https://5.imimg.com/data5/QT/NY/MY-42821634/designer-new-style-garara-wedding-wear-suit-500x500.jpg',
    'https://img2.exportersindia.com/product_images/bc-full/dir_112/3354894/stylish-wedding-wear-lehenga-1497779736-3071612.jpeg',
  ],

  gender: 'male',
  size: [size.L],
  outfit: {
    occasion: {
      casual: 'Jackets',
      groom: 'Kurta pyjama',
    },
    type: categories.men,
  },
  price: 500,
};
