import {
  isAdmin,
  natsWrapper,
  productAttrs,
  ServerError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { index } from '../../../config/algolia';
import {
  BuildWebsitePublisher,
  ProductCreatedPublisher,
} from '../../../events';

import { productValidation } from '../../../middlewares/productValidation';
import { createProduct } from '../../../services/createProduct';

const router = Router();

/**
 *  @desc      Created new product
 *  @route     Post /api/v1/products
 *  @access    Admin
 *  @returns   Status
 */
router.post(
  '/',
  [isAdmin, productValidation],
  async (req: Request, res: Response) => {
    const product = req.body as productAttrs;

    const productDoc = await createProduct(product);

    res.status(201).json({ msg: 'Product added successfully' });

    new BuildWebsitePublisher(natsWrapper.client).publish({
      immediate: false,
      message: 'Product created',
    });

    new ProductCreatedPublisher(natsWrapper.client).publish({
      product: productDoc,
      version: productDoc.version,
    });

    const productObj = {
      objectID: productDoc.id,
      title: productDoc.title,
      description: productDoc.description,
      color: productDoc.color,
      outfit: productDoc.outfit,
      keywords: productDoc.keywords,
      gender: productDoc.gender,
    };
    try {
      const algoliaRes = await index.saveObject(productObj);
      console.log(algoliaRes);
    } catch (error) {
      throw new ServerError(error);
    }
  }
);

export { router as createProductRouter };
