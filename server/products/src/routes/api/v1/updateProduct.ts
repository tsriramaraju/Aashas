import {
  BadRequestError,
  productAttrs,
  ProductDoc,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { isAdmin } from '../../../middlewares/isAdmin';
import { productValidation } from '../../../middlewares/productValidation';
import { updateProduct } from '../../../services/updateProduct';

const router = Router();

/**
 *  @desc      Updates existing product
 *  @route     Put /api/v1/products
 *  @access    Admin
 *  @returns   Status
 */

router.put(
  '/:id',
  [isAdmin, productValidation],
  async (req: Request, res: Response) => {
    const prodId = req.params.id;
    const product = req.body as productAttrs;

    if (!Types.ObjectId.isValid(prodId))
      throw new BadRequestError('Invalid product id');

    const status = await updateProduct(Types.ObjectId(prodId), product);
    if (!status) throw new ResourceNotFoundError('Product not found');
    res.status(201).json({ msg: 'Product updated successfully' });
  }

  //  TODO : publish events

  //  TODO : algolia
);

export { router as updateProductRouter };
