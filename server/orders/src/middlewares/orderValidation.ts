import {
  BadRequestError,
  categories,
  paymentStatus,
  size,
} from '@aashas/common';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
/**
 * Checks whether the incoming request has valid product details
 */
//  TODO : add optional validations later
export const orderValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderType = {
    userId: 'Types.ObjectId',
    payment: 'payment',
    items: 'items',
    status: 'string',
    address: 'address',
    orderDate: 'string',
    price: 'price',
  };
  const price = {
    productTotal: 'number',
    discountPrice: 'number',
    totalAfterDiscount: 'number',
    tax: 'number',
    shippingCharges: 'number',
    totalAmount: 'number',
  };
  const items = {
    prodId: 'Types.ObjectId',
    title: 'string',
    description: 'string',
    size: 'size',
    outfit: 'outfit',
    price: 'number',
    color: 'string',

    images: 'string[]',
    discount: 'number',
    inOffer: 'boolean',
  };

  const payment = {
    status: 'paymentStatus',
  };

  const order = req.body;

  const address = {
    name: 'string',
    house: 'string',
    location: 'string',
    street: 'string',
    pin: 'number',
    city: 'string',
    state: 'string',
  };

  Object.keys(orderType).forEach((key) => {
    const newKey = key as keyof object;
    if (order[newKey] === undefined)
      throw new BadRequestError(`Please enter order ${key}`);

    if (orderType[newKey] === 'string')
      if (typeof order[newKey] !== 'string')
        throw new BadRequestError(`Entered order ${key} is not String`);

    if (orderType[newKey] === 'number')
      if (typeof order[newKey] !== 'number')
        throw new BadRequestError(`Entered order ${key} is not Number`);

    if (orderType[newKey] === 'boolean')
      if (typeof order[newKey] !== 'boolean')
        throw new BadRequestError(`Entered order ${key} is not Boolean`);

    if (orderType[newKey] === 'Types.ObjectId') {
      if (!Types.ObjectId.isValid(order[newKey]))
        throw new BadRequestError(`Entered order ${key} is not valid type`);
    }

    if (orderType[newKey] === 'payment')
      if (!(order[newKey]['status'] in paymentStatus))
        throw new BadRequestError(
          `Entered order ${key}:status is not valid payment status`
        );

    if (orderType[newKey] === 'items')
      Object.keys(items).forEach((item) => {
        const newItem = item as keyof object;

        order[newKey].forEach((product: any) => {
          if (items[newItem] === 'Types.ObjectId') {
            if (!Types.ObjectId.isValid(product[newItem]))
              throw new BadRequestError(
                `Entered order ${key}:${newItem} is not valid type`
              );
          }

          if (items[newItem] === 'string')
            if (typeof product[newItem] !== 'string')
              throw new BadRequestError(
                `Entered order ${key}:${newItem} is not String`
              );

          if (items[newItem] === 'number')
            if (typeof product[newItem] !== 'number')
              throw new BadRequestError(
                `Entered order ${key}:${newItem} is not Number`
              );

          if (items[newItem] === 'boolean')
            if (typeof product[newItem] !== 'boolean')
              throw new BadRequestError(
                `Entered order ${key}:${newItem} is not Boolean`
              );

          if (items[newItem] === 'string[]') {
            if (!Array.isArray(product[newItem])) {
              throw new BadRequestError(
                `Entered order ${key}:${newItem} is not Array`
              );
            }
            product[newItem].forEach((element: any) => {
              if (typeof element !== 'string') {
                throw new BadRequestError(
                  `Entered order ${key}:${newItem} is not String`
                );
              }
            });
          }

          if (items[newItem] === 'outfit') {
            if (!(product[newItem]['type'] in categories))
              throw new BadRequestError(
                `Entered order ${key}:${newItem}:type is not valid category`
              );

            if (typeof product[newItem]['occasion'] !== 'object')
              throw new BadRequestError(
                `Entered order ${key}:${newItem}:occasion is not valid occasion`
              );
          }
          if (items[newItem] === 'size') {
            if (!(product[newItem] in size))
              throw new BadRequestError(
                `Entered order ${key}:${newItem} is not valid size`
              );
          }
        });
      });

    if (orderType[newKey] === 'price')
      Object.keys(price).forEach((item) => {
        const newItem = item as keyof object;

        if (price[newItem] === 'number')
          if (typeof order[newKey][newItem] !== 'number')
            throw new BadRequestError(
              `Entered order ${key}:${newItem} is not Number`
            );
      });

    if (orderType[newKey] === 'address')
      Object.keys(address).forEach((item) => {
        const newItem = item as keyof object;

        if (address[newItem] === 'number')
          if (typeof order[newKey][newItem] !== 'number')
            throw new BadRequestError(
              `Entered order ${key}:${newItem} is not Number`
            );
        if (address[newItem] === 'string')
          if (typeof order[newKey][newItem] !== 'string')
            throw new BadRequestError(
              `Entered order ${key}:${newItem} is not String`
            );
      });
  });

  next();
};
