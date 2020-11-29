import {
  BadRequestError,
  currentUser,
  isAdmin,
  natsWrapper,
  productAttrs,
  ProductDoc,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { ProductUpdatedPublisher } from '../../../events';
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
  [currentUser, isAdmin],
  async (req: Request, res: Response) => {
    const prodId = req.params.id;
    const productData = req.body as productAttrs;

    if (!Types.ObjectId.isValid(prodId))
      throw new BadRequestError('Invalid product id');

    const product = await updateProduct(Types.ObjectId(prodId), productData);
    if (!product) throw new ResourceNotFoundError('Product not found');
    res.status(201).json({ msg: 'Product updated successfully' });
    //  TODO : publish build website event

    new ProductUpdatedPublisher(natsWrapper.client).publish({
      product,
      version: product.version,
    });
  }

  //  TODO : algolia
);

export { router as updateProductRouter };
