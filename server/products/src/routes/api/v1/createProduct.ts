import {
  femaleType,
  kidsType,
  maleType,
  natsWrapper,
  productAttrs,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { ProductCreatedPublisher } from '../../../events';
import { isAdmin } from '../../../middlewares/isAdmin';
import { productValidation } from '../../../middlewares/productValidation';
import { createProduct } from '../../../services/createProduct';
import { removeProperty } from '../../../utils/removeProperty';

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

    //  TODO : publish build website
    new ProductCreatedPublisher(natsWrapper.client).publish({
      product: productDoc,
      version: productDoc.version,
    });

    //  TODO : algolia
  }
);

export { router as createProductRouter };
