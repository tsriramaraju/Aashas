import request from 'supertest';
import { app } from '../../../../app';
import { orderData } from '../../../../dummyData/orders';
import { Order } from '../../../../models/Orders';

describe('Create Order route test group', () => {
  it('should be accessible only by the user', async () => {});

  it('should create order on valid input', async () => {
    const res = await request(app)
      .post('/api/v1/orders/')
      .send(orderData)
      .expect('Content-Type', /json/)
      .expect(201);
    const orders = await Order.find();
    expect(orders.length).toBe(1);
    expect(res.body.msg).toBe('Order created successfully');
  });

  it('should publish event on successful order creation ', async () => {});
});
