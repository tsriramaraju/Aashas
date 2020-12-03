import { BadRequestError } from '@aashas/common';
import { Request, Response, NextFunction } from 'express';
import { validateEmail } from '../utils';

/**
 * Checks whether the incoming request has valid designer details
 */
export const designerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const designerType = {
    name: 'string',
    email: 'email',
    mobile: 'number',
    image: 'string',
    bio: 'string',
  };

  const designer = req.body;

  Object.keys(designerType).forEach((key) => {
    const newKey = key as keyof object;

    if (designerType[newKey] === 'string')
      if (
        typeof designer[newKey] !== 'string' &&
        designer[newKey] !== undefined
      )
        throw new BadRequestError(`Entered ${key} is not String`);

    if (designerType[newKey] === 'email')
      if (!validateEmail(designer[newKey]) && designer[newKey] !== undefined)
        throw new BadRequestError(`Entered ${key} is not valid email`);

    if (designerType[newKey] === 'number')
      if (
        typeof designer[newKey] !== 'number' &&
        designer[newKey] !== undefined
      )
        throw new BadRequestError(`Entered ${key} is not Number`);
  });

  next();
};
