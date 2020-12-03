import {
  BadRequestError,
  isAdmin,
  isUser,
  natsWrapper,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import {
  CustomProductDeletedPublisher,
  ProductDeletedPublisher,
} from '../../../events';
import { deleteCustomProduct } from '../../../services/deleteCustomProduct';

const router = Router();

/**
 *  @desc      Delete list of all products
 *  @route     Delete /api/v1/products
 *  @access    Public
 *  @returns   Products array
 */
router.delete('/custom/:id', [isUser], async (req: Request, res: Response) => {
  const productID = req.params.id;
  //  TODO : add autherization
  if (!Types.ObjectId.isValid(productID))
    throw new BadRequestError('Invalid product id');

  const product = await deleteCustomProduct(Types.ObjectId(productID));

  if (!product) throw new ResourceNotFoundError('No Product found');

  res.status(201).json({ msg: 'Product deleted successfully' });

  new CustomProductDeletedPublisher(natsWrapper.client).publish({
    productID: product.id,
    version: product.version,
    mode: ['email'],
    data: {
      message: 'Custom product updated',
      title: 'custom product title',
      email: req.currentUser?.email,
    },
  });
});

export { router as deleteCustomProductRouter };
