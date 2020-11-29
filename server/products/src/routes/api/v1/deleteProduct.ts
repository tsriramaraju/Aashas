import {
  BadRequestError,
  currentUser,
  isAdmin,
  natsWrapper,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { statSync } from 'fs';
import { Types } from 'mongoose';
import { ProductDeletedPublisher } from '../../../events';

import { deleteProduct } from '../../../services/deleteProduct';
import { getProducts } from '../../../services/getProducts';

const router = Router();

/**
 *  @desc      Delete list of all products
 *  @route     Delete /api/v1/products
 *  @access    Public
 *  @returns   Products array
 */
router.delete(
  '/:id',
  [currentUser, isAdmin],
  async (req: Request, res: Response) => {
    const productID = req.params.id;

    if (!Types.ObjectId.isValid(productID))
      throw new BadRequestError('Invalid product id');

    const product = await deleteProduct(Types.ObjectId(productID));

    if (!product) throw new ResourceNotFoundError('No Product found');

    res.status(201).json({ msg: 'Product deleted successfully' });
    //  TODO : publish build website event

    new ProductDeletedPublisher(natsWrapper.client).publish({
      productID: product.id,
      version: product.version,
    });

    //  TODO : algolia
  }
);

export { router as deleteProductRouter };
