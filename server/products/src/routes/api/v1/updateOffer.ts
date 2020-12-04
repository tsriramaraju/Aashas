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
  OfferUpdatedPublisher,
  ProductUpdatedPublisher,
} from '../../../events';
import { updateProduct } from '../../../services/updateProduct';

const router = Router();

/**
 *  @desc      Updates existing product
 *  @route     put /api/v1/products/offers/:id
 *  @access    Admin
 *  @returns   Status
 */

router.put('/offers/:id', [isAdmin], async (req: Request, res: Response) => {
  const prodId = req.params.id;
  const discount = +req.body.discount;

  if (discount <= 0 || discount >= 100)
    throw new BadRequestError('Invalid offer');

  if (!Types.ObjectId.isValid(prodId))
    throw new BadRequestError('Invalid product id');

  const offer: offer = {
    discount,
    inOffer: true,
  };

  const product = await updateProduct(Types.ObjectId(prodId), offer);
  if (!product) throw new ResourceNotFoundError('Product not found');
  res.status(201).json({ msg: 'Product updated successfully' });
  //  TODO : publish build website event

  new ProductUpdatedPublisher(natsWrapper.client).publish({
    product,
    version: product.version,
  });

  new OfferUpdatedPublisher(natsWrapper.client).publish({
    version: product.version,
    product: product,
    mode: ['email'],
    data: {
      message: 'hello',
      title: 'Offer added',
    },
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
  try {
    const algoliaRes = await index.saveObject(productObj);
    console.log(algoliaRes);
  } catch (error) {
    throw new ServerError(error);
  }
  new BuildWebsitePublisher(natsWrapper.client).publish({
    immediate: false,
    message: 'Offer updated',
  });
});

export { router as updateOfferRouter };
