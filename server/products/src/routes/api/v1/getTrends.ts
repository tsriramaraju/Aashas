import { Router, Request, Response } from 'express';
import { getProducts } from '../../../services/getProducts';

const router = Router();

/**
 *  @desc      Get list of all trending products
 *  @route     Get /api/v1/products/trends
 *  @access    Public
 *  @returns   Products array
 */
router.get('/trends', async (req: Request, res: Response) => {
  const products = await getProducts({ trending: true });

  res.status(201).json(products);
});

export { router as getTrendingProductsRouter };
