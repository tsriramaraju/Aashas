import { Types } from 'mongoose';
import { deleteOrder } from '../deleteOrder';

describe('Delete Order service test group', () => {
  it('should delete order successfully', async () => {
    const order = await global.createOrder(Types.ObjectId());
    const res = await deleteOrder(order.id);
    expect(order.id).toBe(res!.id);
  });

  it('should return null on deleting non existing order', async () => {
    const res = await deleteOrder(Types.ObjectId());
    expect(res).toBe(null);
  });
});
