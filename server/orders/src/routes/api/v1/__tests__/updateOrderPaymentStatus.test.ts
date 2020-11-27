import {
  paymentStatus,
  paymentModes,
  paymentStatusUpdate,
} from '@aashas/common';
import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';
import { Order } from '../../../../models/Orders';

describe('Update order Payment Status test group', () => {
  const data = {
    payment: {
      status: paymentStatus.paid,
      method: paymentModes.creditCard,
    },
  };
  it('should be accessible only by the user', async () => {});

  // it('should Update existing order Payment  with valid inputs', async () => {
  //   const order = await global.createOrder(Types.ObjectId());

  //   expect(order.payment.method).toBe(paymentModes.UPI);
  //   expect(order.payment.status).toBe(paymentStatus.pending);

  //   const res = await request(app)
  //     .put(`/api/v1/orders/payment/${order.id}`)
  //     .send(data)
  //     .expect('Content-Type', /json/)
  //     .expect(201);
  //   const orders = await Order.find();

  //   expect(orders![0].payment.method).toBe(paymentModes.creditCard);
  //   expect(orders![0].payment.status).toBe(paymentStatus.paid);
  //   expect(res.body.msg).toBe('Order payment status update successfully');
  // });

  // it('should throw Bad request error on providing invalid input', async () => {
  //   const res = await request(app)
  //     .put(`/api/v1/orders/payment/123456`)
  //     .send(data)
  //     .expect('Content-Type', /json/)
  //     .expect(400);

  //   expect(res.body.msg).toBe('Invalid order id');
  // });

  // it("should throw resource not found error if order don't exist", async () => {
  //   const res = await request(app)
  //     .put(`/api/v1/orders/status/${Types.ObjectId()}`)
  //     .send({ status: 'shipped' })
  //     .expect('Content-Type', /json/)
  //     .expect(420);

  //   expect(res.body.msg).toBe('Order not available');
  // });
});
