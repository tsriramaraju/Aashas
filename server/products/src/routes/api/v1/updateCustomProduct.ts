import {
  BadRequestError,
  customProductsAttrs,
  isAdmin,
  natsWrapper,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { CustomProductUpdatedPublisher } from '../../../events';
import { updateCustomProduct } from '../../../services/updateCustomProduct';

const router = Router();

/**
 *  @desc      Creates custom product
 *  @route     Put /api/v1/products/custom-update/:id
 *  @access    Admin
 *  @returns   Status
 */

router.put(
  '/custom-update/:id',
  [isAdmin],
  async (req: Request, res: Response) => {
    const prodId = req.params.id;
    const productData = req.body as customProductsAttrs;

    if (!Types.ObjectId.isValid(prodId))
      throw new BadRequestError('Invalid product id');

    const product = await updateCustomProduct(prodId, {
      ...productData,
    });
    if (!product) throw new ResourceNotFoundError('Custom Product not found');
    res.status(201).json({ msg: 'Custom Product added successfully' });

    new CustomProductUpdatedPublisher(natsWrapper.client).publish({
      product: product,
      version: product.version,
      mode: ['email'],
      data: {
        message: 'Custom product updated',
        title: 'custom product title',
        email: req.currentUser?.email,
      },
    });
  }
);

export { router as updateCustomProductRouter };
