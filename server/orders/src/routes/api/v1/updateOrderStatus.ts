import {
  BadRequestError,
  isAdmin,
  natsWrapper,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { OrderStatusUpdatedPublisher } from '../../../events/publishers/orderStatusUpdate';
import { updateOrder } from '../../../services/updateOrder';

const router = Router();

/**
 *  @desc      Creates order
 *  @route     put /api/v1/orders/status/:id
 *  @access    admin
 *  @returns   status
 */
router.put('/status/:id', [isAdmin], async (req: Request, res: Response) => {
  const status = req.body;
  const orderId = req.params.id;

  if (!Types.ObjectId.isValid(orderId))
    throw new BadRequestError('Invalid order id');

  const orderDoc = await updateOrder(orderId, status);

  if (!orderDoc) throw new ResourceNotFoundError('Order not available');

  new OrderStatusUpdatedPublisher(natsWrapper.client).publish({
    version: orderDoc.version,
    mode: ['email'],
    orderID: orderDoc.id,
    orderStatus: status,
    data: {
      title: 'Order created',
      message: 'this is message',
      email: orderDoc.email,
    },
  });

  res.status(201).json({ msg: 'Order status updated successfully' });
});

export { router as updateOrderStatusRouter };
