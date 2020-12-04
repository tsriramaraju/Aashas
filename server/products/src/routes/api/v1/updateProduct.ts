import {
  BadRequestError,
  isAdmin,
  natsWrapper,
  productAttrs,
  ProductDoc,
  ResourceNotFoundError,
  ServerError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { index } from '../../../config/algolia';
import { ProductUpdatedPublisher } from '../../../events';
import { productValidation } from '../../../middlewares/productValidation';
import { updateProduct } from '../../../services/updateProduct';

const router = Router();

/**
 *  @desc      Updates existing product
 *  @route     Put /api/v1/products/update/:id
 *  @access    Admin
 *  @returns   Status
 */

router.put(
  '/update/:id',
  [isAdmin, productValidation],
  async (req: Request, res: Response) => {
    const prodId = req.params.id;
    const productData = req.body as productAttrs;

    if (!Types.ObjectId.isValid(prodId))
      throw new BadRequestError('Invalid product id');

    const product = await updateProduct(Types.ObjectId(prodId), productData);
    if (!product) throw new ResourceNotFoundError('Product not found');
    res.status(201).json({ msg: 'Product updated successfully' });
    //  TODO : publish build website event

    new ProductUpdatedPublisher(natsWrapper.client).publish({
      product,
      version: product.version,
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
  }
);

export { router as updateProductRouter };
