import { natsWrapper } from '@aashas/common';
import request from 'supertest';
import { app } from '../../../../app';
import { orderData } from '../../../../dummy data/orders';
import { Order } from '../../../../models/Orders';

describe('Create Order route test group', () => {
  it('should be accessible only by the user', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .post('/api/v1/orders/')
      .send(orderData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(401);

    expect(res.body.msg).toBe('Sorry, You are not authorized for this request');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });

  it('should create order on valid input', async () => {
    const token = await global.userLogin();
    const res = await request(app)
      .post('/api/v1/orders/')
      .send(orderData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const orders = await Order.find();
    expect(orders.length).toBe(1);
    expect(res.body.msg).toBe('Order created successfully');
  });

  it('should publish event on successful order creation ', async () => {
    const token = await global.userLogin();
    const res = await request(app)
      .post('/api/v1/orders/')
      .send(orderData)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const orders = await Order.find();
    expect(orders.length).toBe(1);
    expect(res.body.msg).toBe('Order created successfully');
    expect(natsWrapper.client.publish).toBeCalledTimes(1);
  });

  it('should throw bad request on invalid input ', async () => {
    const token = await global.userLogin();
    const res = await request(app)
      .post('/api/v1/orders/')

      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Please enter order userId');
    expect(natsWrapper.client.publish).toBeCalledTimes(0);
  });
});
