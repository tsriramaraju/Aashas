import { paymentStatus } from '@aashas/common';
import { Types } from 'mongoose';
import { updateOrder } from '../updateOrder';

describe('Update order service test group', () => {
  it('should Update existing order status', async () => {
    const order = await global.createOrder(Types.ObjectId());
    const res = await updateOrder(order.id, { status: 'shipping' });
    expect(res!.status).toBe('shipping');
  });
  it('should Update existing order payment status', async () => {
    const order = await global.createOrder(Types.ObjectId());
    const res = await updateOrder(order.id, {
      payment: { status: paymentStatus.paid },
    });
    expect(res!.payment.status).toBe(paymentStatus.paid);
  });

  it("should return null if order don't exist", async () => {
    const res = await updateOrder(Types.ObjectId(), { status: 'shipping' });
    expect(res).toBe(null);
  });
});
