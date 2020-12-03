import { customProductRequestAttrs, isUser, natsWrapper } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { CustomProductCreatedPublisher } from '../../../events';
import { requestCustomProduct } from '../../../services/requestCustomProduct';

const router = Router();

/**
 *  @desc      Created new Custom product
 *  @route     Post /api/v1/products/custom
 *  @access    User
 *  @returns   Status
 */
router.post('/custom', [isUser], async (req: Request, res: Response) => {
  const product = req.body as customProductRequestAttrs;

  await requestCustomProduct(product);

  res.status(201).json({ msg: 'Custom Product is requested' });
});

export { router as requestCustomProductRouter };
