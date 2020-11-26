import { CategoryOffer, outfit, ResourceNotFoundError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { isAdmin } from '../../../middlewares/isAdmin';
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

    const status = await updateCategoryOffer(offer);
    if (!status) throw new ResourceNotFoundError('Products not found');
    res.status(201).json({ msg: 'Products updated successfully' });
  }

  //  TODO : publish events

  //  TODO : algolia
);

export { router as removeCategoryOfferRouter };
