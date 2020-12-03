import { BadRequestError } from '@aashas/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Checks whether the incoming request has valid address details
 */

export const addressValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const address = req.body;

  const addressType = {
    name: 'string',
    house: 'string',
    location: 'string',
    street: 'string',
    pin: 'number',
    city: 'string',
    state: 'string',
  };

  Object.keys(addressType).forEach((key) => {
    const newKey = key as keyof object;
    if (address[newKey] === undefined)
      throw new BadRequestError(`Please enter address ${key}`);

    if (addressType[newKey] === 'string')
      if (typeof address[newKey] !== 'string')
        throw new BadRequestError(`Entered address ${key} is not String`);

    if (addressType[newKey] === 'number')
      if (typeof address[newKey] !== 'number')
        throw new BadRequestError(`Entered address ${key} is not Number`);
  });

  next();
};
