import { BadRequestError, offer, ResourceNotFoundError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { isAdmin } from '../../../middlewares/isAdmin';
import { updateProduct } from '../../../services/updateProduct';

const router = Router();

/**
 *  @desc      Updates existing product
 *  @route     post /api/v1/products/offers/:id
 *  @access    Admin
 *  @returns   Status
 */

router.post(
  '/offers/:id',
  [isAdmin],
  async (req: Request, res: Response) => {
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

    const status = await updateProduct(Types.ObjectId(prodId), offer);
    if (!status) throw new ResourceNotFoundError('Product not found');
    res.status(201).json({ msg: 'Product updated successfully' });
  }

  //  TODO : publish events

  //  TODO : algolia
);

export { router as createOfferRouter };
