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
import { ProductDeletedPublisher } from '../../../events';

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

  const product = await deleteProduct(Types.ObjectId(productID));

  if (!product) throw new ResourceNotFoundError('No Product found');

  res.status(201).json({ msg: 'Product deleted successfully' });
  //  TODO : publish build website event

  new ProductDeletedPublisher(natsWrapper.client).publish({
    productID: product.id,
    version: product.version + 1,
  });

  try {
    const algoliaRes = await index.deleteObject(product.id.toString());
    console.log(algoliaRes);
  } catch (error) {
    throw new ServerError(error);
  }
});

export { router as deleteProductRouter };
