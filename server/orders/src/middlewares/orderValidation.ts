import { BadRequestError, paymentStatus } from '@aashas/common';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
/**
 * Checks whether the incoming request has valid product details
 */
export const productValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  TODO : add outfit type in orders

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
    price: 'number',
    color: 'string',
    category: 'category',
    images: 'string[]',
    discount: 'number',
    inOffer: 'boolean',
  };

  const payment = {
    status: 'paymentStatus',
  };

  const order = req.body;

  const category = {
    main: 'string',
    sub: 'string',
  };

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

    if (orderType[newKey] === 'Types.ObjectId')
      if (!Types.ObjectId.isValid(order[newKey]))
        throw new BadRequestError(`Entered order ${key} is not valid type`);

    if (orderType[newKey] === 'payment')
      if (!(order[newKey]['status'] in paymentStatus))
        throw new BadRequestError(
          `Entered order ${key}:status is not valid payment status`
        );

    if (orderType[newKey] === 'items')
      Object.keys(items).forEach((item) => {
        const newItem = item as keyof object;
        if (items[newItem] === 'Types.ObjectId')
          if (!Types.ObjectId.isValid(order[newKey][newItem]))
            throw new BadRequestError(
              `Entered order ${key}:${newItem} is not valid type`
            );

        if (items[newItem] === 'string')
          if (typeof order[newKey][newItem] !== 'string')
            throw new BadRequestError(
              `Entered order ${key}:${newItem} is not String`
            );

        if (items[newItem] === 'number')
          if (typeof order[newKey][newItem] !== 'number')
            throw new BadRequestError(
              `Entered order ${key}:${newItem} is not Number`
            );

        if (items[newItem] === 'boolean')
          if (typeof order[newKey][newItem] !== 'boolean')
            throw new BadRequestError(
              `Entered order ${key}:${newItem} is not Boolean`
            );

        if (items[newItem] === 'string[]')
          order[newKey][newItem].forEach((element: any) => {
            if (typeof element !== 'string')
              throw new BadRequestError(
                `Entered order ${key}:${newItem} is not String`
              );
          });

        if (items[newItem] === 'category') {
          if (typeof order[newKey][newItem]['main'] !== 'string')
            throw new BadRequestError(
              `Entered order ${key}:${newItem}:main is not String`
            );
          if (typeof order[newKey][newItem]['sub'] !== 'string')
            throw new BadRequestError(
              `Entered order ${key}:${newItem}:sub is not String`
            );
        }
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

        if (price[newItem] === 'number')
          if (typeof order[newKey][newItem] !== 'number')
            throw new BadRequestError(
              `Entered order ${key}:${newItem} is not Number`
            );
        if (price[newItem] === 'string')
          if (typeof order[newKey][newItem] !== 'string')
            throw new BadRequestError(
              `Entered order ${key}:${newItem} is not String`
            );
      });

    // if (orderType[newKey] === 'outfit') {
    //   if (!(order[newKey]['type'] in categories))
    //     throw new BadRequestError(`Entered order ${key} is not valid category`);
    //   if (typeof order[newKey]['occasion'] !== 'object')
    //     throw new BadRequestError(`Entered order ${key} is not valid occasion`);
    // }
  });

  next();
};
