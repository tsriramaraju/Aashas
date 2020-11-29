import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { orderData } from '../../../../dummyData/orders';
import { Order } from '../../../../models/Orders';

describe('Create Order route test group', () => {
  it('should be accessible only by the admin', async () => {});

  it('should Delete order on valid input', async () => {
    const order = await global.createOrder(Types.ObjectId());
    const preFetch = await Order.find();
    expect(preFetch.length).toBe(1);
    const res = await request(app)
      .delete(`/api/v1/orders/${order.id}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const orders = await Order.find();
    expect(orders.length).toBe(0);
    expect(res.body.msg).toBe('Order Deleted successfully');
  });

  it('should return resource not found on deleting non existing order', async () => {
    const res = await request(app)
      .delete(`/api/v1/orders/${Types.ObjectId()}`)
      .expect('Content-Type', /json/)
      .expect(420);
    const orders = await Order.find();
    expect(orders.length).toBe(0);
    expect(res.body.msg).toBe('Order not available');
  });

  it('should throw Bad request error on providing invalid input', async () => {
    const res = await request(app)
      .delete(`/api/v1/orders/123456`)
      .send({ status: 'shipped' })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Invalid order id');
  });

  it('should publish event on successful order deletion ', async () => {});
});
