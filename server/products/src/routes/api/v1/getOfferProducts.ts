import { Router, Request, Response } from 'express';
import { getOfferProducts } from '../../../services/getOfferProducts';

const router = Router();

/**
 *  @desc      Get list of all offer products
 *  @route     Get /api/v1/products/offers
 *  @access    Public
 *  @returns   Products array
 */
router.get('/offers', async (req: Request, res: Response) => {
  const products = await getOfferProducts();

  res.status(201).json(products);
});

export { router as getOfferProductsRouter };
