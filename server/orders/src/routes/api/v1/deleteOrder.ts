import {
  BadRequestError,
  natsWrapper,
  ResourceNotFoundError,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { OrderDeletedPublisher } from '../../../events/publishers/orderDeleted';
import { deleteOrder } from '../../../services/deleteOrder';

const router = Router();

/**
 *  @desc      delete order
 *  @route     Delete /api/v1/orders/:id
 *  @access    admin
 *  @returns   status
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const orderId = req.params.id;
  if (!Types.ObjectId.isValid(orderId))
    throw new BadRequestError('Invalid order id');
  const orderDoc = await deleteOrder(Types.ObjectId(orderId));

  if (!orderDoc) throw new ResourceNotFoundError('Order not available');

  new OrderDeletedPublisher(natsWrapper.client).publish({
    orderID: orderDoc.id,
    version: orderDoc.version,
    mode: ['email'],
    order: orderDoc,
    data: {
      title: 'Order created',
      message: 'this is message',
    },
    //  FIXME : add email or contact
  });

  res.status(201).json({ msg: 'Order Deleted successfully' });
});

export { router as deleteOrderRouter };
