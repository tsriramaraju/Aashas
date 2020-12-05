import { natsWrapper } from '@aashas/common';
import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { Order } from '../../../../models/Orders';

describe('Update order Status test group', () => {
  it('should be accessible only by the user', async () => {
    const token = await global.userLogin();
    const order = await global.createOrder(Types.ObjectId().toHexString());

    expect(order.status).toBe('working on it');

    const res = await request(app)
      .put(`/api/v1/orders/status/${order.id}`)
      .send({ status: 'shipped' })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);

    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });

  it('should Update existing order status with valid inputs', async () => {
    const token = await global.adminLogin();
    const order = await global.createOrder(Types.ObjectId().toHexString());

    expect(order.status).toBe('working on it');

    const res = await request(app)
      .put(`/api/v1/orders/status/${order.id}`)
      .send({ status: 'shipped' })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const orders = await Order.find();
    expect(orders![0].status).toBe('shipped');
    expect(orders[0].version).toBe(1);
    expect(res.body.msg).toBe('Order status updated successfully');
    expect(natsWrapper.client.publish).toBeCalledTimes(1);
  });

  it('should throw Bad request error on providing invalid input', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .put(`/api/v1/orders/status/123456`)
      .send({ status: 'shipped' })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Invalid order id');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });

  it("should throw resource not found error if order don't exist", async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .put(`/api/v1/orders/status/${Types.ObjectId().toHexString()}`)
      .send({ status: 'shipped' })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
    expect(res.body.msg).toBe('Order not available');
  });
});
