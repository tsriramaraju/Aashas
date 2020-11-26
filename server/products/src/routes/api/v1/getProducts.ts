import { Router, Request, Response } from 'express';
import { getProducts } from '../../../services/getProducts';

const router = Router();

/**
 *  @desc      Get list of all products
 *  @route     Get /api/v1/products
 *  @access    Public
 *  @returns   Products array
 */
router.get('/', async (req: Request, res: Response) => {
  const products = await getProducts();

  res.status(201).json(products);
});

export { router as getProductsRouter };
