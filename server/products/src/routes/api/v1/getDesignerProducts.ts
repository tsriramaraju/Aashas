import { Router, Request, Response } from 'express';
import { getProducts } from '../../../services/getProducts';

const router = Router();

/**
 *  @desc      Get list of all designer products
 *  @route     Get /api/v1/products/designer
 *  @access    Public
 *  @returns   Products array
 */
router.get('/designer', async (req: Request, res: Response) => {
  const products = await getProducts({ designerCollection: true });

  res.status(201).json(products);
});

export { router as getDesignerProductsRouter };
