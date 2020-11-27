import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { Order } from '../../../../models/Orders';

describe('Update order Status test group', () => {
  it('should be accessible only by the user', async () => {});

  it('should Update existing order status with valid inputs', async () => {
    const order = await global.createOrder(Types.ObjectId());

    expect(order.status).toBe('working on it');

    const res = await request(app)
      .put(`/api/v1/orders/status/${order.id}`)
      .send({ status: 'shipped' })
      .expect('Content-Type', /json/)
      .expect(201);
    const orders = await Order.find();
    expect(orders![0].status).toBe('shipped');
    expect(res.body.msg).toBe('Order status updated successfully');
  });

  it('should throw Bad request error on providing invalid input', async () => {
    const res = await request(app)
      .put(`/api/v1/orders/status/123456`)
      .send({ status: 'shipped' })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Invalid order id');
  });

  it("should throw resource not found error if order don't exist", async () => {
    const res = await request(app)
      .put(`/api/v1/orders/status/${Types.ObjectId()}`)
      .send({ status: 'shipped' })
      .expect('Content-Type', /json/)
      .expect(420);

    expect(res.body.msg).toBe('Order not available');
  });
});
