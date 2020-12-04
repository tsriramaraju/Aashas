import {
  BadRequestError,
  CategoryOffer,
  isAdmin,
  natsWrapper,
  ResourceNotFoundError,
  ServerError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { index } from '../../../config/algolia';
import {
  BuildWebsitePublisher,
  OfferCreatedPublisher,
  ProductUpdatedPublisher,
} from '../../../events';
import { updateCategoryOffer } from '../../../services/updateCategoryOffer';

const router = Router();

/**
 *  @desc      Updates existing products
 *  @route     post /api/v1/products/offers-category
 *  @access    Admin
 *  @returns   Status
 */

router.post(
  '/offers-category',
  [isAdmin],
  async (req: Request, res: Response) => {
    const offer = req.body as CategoryOffer;

    if (offer.discount <= 0 || offer.discount >= 100)
      throw new BadRequestError('Invalid discount');

    if (typeof offer.inOffer !== 'boolean')
      throw new BadRequestError('Invalid offer Type');

    const products = await updateCategoryOffer(offer);
    if (!products) throw new ResourceNotFoundError('Products not found');
    res.status(201).json({ msg: 'Products updated successfully' });

    const promises = products.map(async (product) => {
      new ProductUpdatedPublisher(natsWrapper.client).publish({
        product,
        version: product.version,
      });

      new OfferCreatedPublisher(natsWrapper.client).publish({
        version: product.version,
        product: product,
        mode: ['email'],
        data: {
          title: 'category offer created',
          message: 'hello',
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
    });
    await Promise.all(promises);
    new BuildWebsitePublisher(natsWrapper.client).publish({
      immediate: false,
      message: 'Category Offer created',
    });
  }
);

export { router as createCategoryOfferRouter };
