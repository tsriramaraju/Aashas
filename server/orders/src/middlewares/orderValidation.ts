import {
  BadRequestError,
  categories,
  maleType,
  productAttrs,
  size,
} from '@aashas/common';
import { Request, Response, NextFunction } from 'express';
/**
 * Checks whether the incoming request has valid product details
 */
export const productValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderType = {
    userId: 'Types.ObjectId',
    payment: {
      status: 'paymentStatus',
    },
    items: {
      prodId: 'Types.ObjectId',
      title: 'string',
      description: 'string',
      size: 'size',
      price: 'number',
      color: 'string',
      category: {
        main: 'string',
        sub: 'string',
      },
      images: 'string[]',
      discount: 'number',
      inOffer: 'boolean',
    },

    status: 'string',

    address: 'address',
    orderDate: 'string',

    price: {
      productTotal: 'number',
      discountPrice: 'number',
      totalAfterDiscount: 'number',
      tax: 'number',
      shippingCharges: 'number',
      totalAmount: 'number',
    },
  };

  const product = req.body;

  //  TODO : add orders validation later

  // Object.keys(productType).forEach((key) => {
  //   const newKey = key as keyof object;
  //   if (product[newKey] === undefined)
  //     throw new BadRequestError(`Please enter product ${key}`);

  //   if (productType[newKey] === 'string')
  //     if (typeof product[newKey] !== 'string')
  //       throw new BadRequestError(`Entered product ${key} is not String`);

  //   if (productType[newKey] === 'size[]') {
  //     product[newKey].forEach((element: any) => {
  //       if (!(element in size))
  //         throw new BadRequestError(`Entered product ${key} is not valid size`);
  //     });
  //   }

  //   if (productType[newKey] === 'string[]')
  //     product[newKey].forEach((element: any) => {
  //       if (typeof element !== 'string')
  //         throw new BadRequestError(`Entered product ${key} is not String`);
  //     });

  //   if (productType[newKey] === 'number')
  //     if (typeof product[newKey] !== 'number')
  //       throw new BadRequestError(`Entered product ${key} is not Number`);

  //   if (productType[newKey] === 'gender')
  //     if (product[newKey] !== 'male' && product[newKey] !== 'female')
  //       throw new BadRequestError(`Entered product ${key} is not valid gender`);

  //   if (productType[newKey] === 'boolean')
  //     if (typeof product[newKey] !== 'boolean')
  //       throw new BadRequestError(`Entered product ${key} is not Boolean`);

  //   if (productType[newKey] === 'outfit') {
  //     if (!(product[newKey]['type'] in categories))
  //       throw new BadRequestError(
  //         `Entered product ${key} is not valid category`
  //       );
  //     if (typeof product[newKey]['occasion'] !== 'object')
  //       throw new BadRequestError(
  //         `Entered product ${key} is not valid occasion`
  //       );
  //   }
  // });

  next();
};
