import { BadRequestError } from '@aashas/common';
import { Request, Response, NextFunction } from 'express';
import { validateEmail } from '../utils';

/**
 * Checks whether the incoming request has valid banner details
 */
export const bannerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bannerType = {
    title: 'string',
    img: 'string',
    type: 'percentage price',
    discount: 'number',
  };

  const banner = req.body;

  Object.keys(bannerType).forEach((key) => {
    const newKey = key as keyof object;

    if (bannerType[newKey] === 'string')
      if (typeof banner[newKey] !== 'string' && banner[newKey] !== undefined)
        throw new BadRequestError(`Entered ${key} is not String`);

    if (bannerType[newKey] === 'number')
      if (typeof banner[newKey] !== 'number' && banner[newKey] !== undefined)
        throw new BadRequestError(`Entered ${key} is not Number`);

    if (bannerType[newKey] === 'percentage price')
      if (
        !(banner[newKey] === 'percentage' || banner[newKey] === 'price') &&
        banner[newKey] !== undefined
      )
        throw new BadRequestError(`Entered ${key} is not valid discount type`);
  });

  next();
};
