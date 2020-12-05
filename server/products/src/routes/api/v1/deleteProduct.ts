import {
  BadRequestError,
  isAdmin,
  natsWrapper,
  ResourceNotFoundError,
  ServerError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { index } from '../../../config/algolia';
import {
  BuildWebsitePublisher,
  ProductDeletedPublisher,
} from '../../../events';

import { deleteProduct } from '../../../services/deleteProduct';

const router = Router();

/**
 *  @desc      Delete list of all products
 *  @route     Delete /api/v1/products
 *  @access    Public
 *  @returns   Products array
 */
router.delete('/delete/:id', [isAdmin], async (req: Request, res: Response) => {
  const productID = req.params.id;

  if (!Types.ObjectId.isValid(productID))
    throw new BadRequestError('Invalid product id');

  const product = await deleteProduct(productID);

  if (!product) throw new ResourceNotFoundError('No Product found');

  res.status(201).json({ msg: 'Product deleted successfully' });

  new ProductDeletedPublisher(natsWrapper.client).publish({
    productID: product.id,
    version: product.version + 1,
  });

  try {
    const algoliaRes = await index.deleteObject(product.id.toString());
    process.env.NODE_ENV !== 'test' && console.log(algoliaRes);
  } catch (error) {
    throw new ServerError(error);
  }
  new BuildWebsitePublisher(natsWrapper.client).publish({
    immediate: false,
    message: 'Product deleted',
  });
});

export { router as deleteProductRouter };
