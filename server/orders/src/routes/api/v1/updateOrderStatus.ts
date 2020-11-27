import { BadRequestError, ResourceNotFoundError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { createOrder } from '../../../services/createOrder';
import { updateOrder } from '../../../services/updateOrder';

const router = Router();

/**
 *  @desc      Creates order
 *  @route     put /api/v1/orders/status/:id
 *  @access    admin
 *  @returns   status
 */
router.put('/status/:id', async (req: Request, res: Response) => {
  const status = req.body;
  const orderId = req.params.id;

  if (!Types.ObjectId.isValid(orderId))
    throw new BadRequestError('Invalid order id');

  const orderDoc = await updateOrder(Types.ObjectId(orderId), status);

  if (!orderDoc) throw new ResourceNotFoundError('Order not available');

  //  TODO : events

  res.status(201).json({ msg: 'Order status updated successfully' });
});

export { router as updateOrderStatusRouter };
