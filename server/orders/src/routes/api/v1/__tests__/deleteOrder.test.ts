import { natsWrapper } from '@aashas/common';
import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { Order } from '../../../../models/Orders';

describe('Create Order route test group', () => {
  it('should be accessible only by the admin', async () => {
    const token = await global.userLogin();
    const order = await global.createOrder(Types.ObjectId());
    const preFetch = await Order.find();
    expect(preFetch.length).toBe(1);
    const res = await request(app)
      .delete(`/api/v1/orders/${order.id}`)

      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
  });

  it('should Delete order on valid input', async () => {
    const token = await global.adminLogin();
    const order = await global.createOrder(Types.ObjectId());
    const preFetch = await Order.find();
    expect(preFetch.length).toBe(1);
    const res = await request(app)
      .delete(`/api/v1/orders/${order.id}`)

      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const orders = await Order.find();
    expect(orders.length).toBe(0);

    expect(res.body.msg).toBe('Order Deleted successfully');
    expect(natsWrapper.client.publish).toBeCalledTimes(1);
  });

  it('should return resource not found on deleting non existing order', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .delete(`/api/v1/orders/${Types.ObjectId()}`)

      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);
    const orders = await Order.find();
    expect(orders.length).toBe(0);
    expect(res.body.msg).toBe('Order not available');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });

  it('should throw Bad request error on providing invalid input', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .delete(`/api/v1/orders/123456`)

      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'shipped' })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Invalid order id');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });

  it('should publish event on successful order deletion ', async () => {
    const token = await global.adminLogin();
    const order = await global.createOrder(Types.ObjectId());
    const preFetch = await Order.find();
    expect(preFetch.length).toBe(1);
    const res = await request(app)
      .delete(`/api/v1/orders/${order.id}`)

      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const orders = await Order.find();
    expect(orders.length).toBe(0);
    expect(res.body.msg).toBe('Order Deleted successfully');
    expect(natsWrapper.client.publish).toBeCalledTimes(1);
  });
});
