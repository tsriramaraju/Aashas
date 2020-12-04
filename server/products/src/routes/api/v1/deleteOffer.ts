import {
  BadRequestError,
  isAdmin,
  natsWrapper,
  offer,
  ResourceNotFoundError,
  ServerError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { index } from '../../../config/algolia';
import {
  BuildWebsitePublisher,
  OfferDeletedPublisher,
  ProductUpdatedPublisher,
} from '../../../events';

import { updateProduct } from '../../../services/updateProduct';

const router = Router();

/**
 *  @desc      Updates existing product
 *  @route     delete /api/v1/products/offers/:id
 *  @access    Admin
 *  @returns   Status
 */

router.delete('/offers/:id', [isAdmin], async (req: Request, res: Response) => {
  const prodId = req.params.id;

  if (!Types.ObjectId.isValid(prodId))
    throw new BadRequestError('Invalid product id');

  const offer: offer = {
    discount: 0,
    inOffer: false,
  };

  const product = await updateProduct(Types.ObjectId(prodId), offer);
  if (!product) throw new ResourceNotFoundError('Product not found');
  res.status(201).json({ msg: 'Product updated successfully' });

  new ProductUpdatedPublisher(natsWrapper.client).publish({
    product,
    version: product.version,
  });

  new OfferDeletedPublisher(natsWrapper.client).publish({
    version: product.version,
    product: product,
  });
  const productObj = {
    objectID: product.id,
    title: product.title,
    description: product.description,
    color: product.color,
    outfit: product.outfit,
    keywords: product.keywords,
    gender: product.gender,
  };
  new BuildWebsitePublisher(natsWrapper.client).publish({
    immediate: false,
    message: 'offer Deleted',
  });

  try {
    const algoliaRes = await index.saveObject(productObj);
    console.log(algoliaRes);
  } catch (error) {
    throw new ServerError(error);
  }
});

export { router as deleteOfferRouter };
