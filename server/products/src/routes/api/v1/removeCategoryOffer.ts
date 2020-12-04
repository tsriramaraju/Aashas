import {
  CategoryOffer,
  isAdmin,
  natsWrapper,
  outfit,
  ResourceNotFoundError,
  ServerError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { index } from '../../../config/algolia';
import {
  BuildWebsitePublisher,
  OfferDeletedPublisher,
  ProductUpdatedPublisher,
} from '../../../events';

import { updateCategoryOffer } from '../../../services/updateCategoryOffer';

const router = Router();

/**
 *  @desc      Updates existing products
 *  @route     delete /api/v1/products/category
 *  @access    Admin
 *  @returns   Status
 */

router.delete(
  '/category/remove',
  [isAdmin],
  async (req: Request, res: Response) => {
    const outfit = req.body as outfit;

    const offer: CategoryOffer = {
      discount: 0,
      inOffer: false,
      outfit,
    };
    const products = await updateCategoryOffer(offer);

    if (!products) throw new ResourceNotFoundError('Products not found');
    res.status(201).json({ msg: 'Products updated successfully' });

    const promises = products.map(async (product) => {
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
      message: 'Offer removed',
    });
  }
);

export { router as removeCategoryOfferRouter };
