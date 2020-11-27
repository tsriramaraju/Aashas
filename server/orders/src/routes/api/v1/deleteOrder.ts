import { BadRequestError, ResourceNotFoundError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
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

  //  TODO : events

  res.status(201).json({ msg: 'Order Deleted successfully' });
});

export { router as deleteOrderRouter };
