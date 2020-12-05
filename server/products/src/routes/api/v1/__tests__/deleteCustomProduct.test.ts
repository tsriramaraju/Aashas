import { natsWrapper } from '@aashas/common';
import { Types } from 'mongoose';
import request from 'supertest';
import { app } from '../../../../app';

describe('Delete custom product route test group', () => {
  it('should be accessible by admin too', async () => {
    const token = await global.adminLogin();
    const res = await request(app)
      .delete('/api/v1/products/custom/1233')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Invalid product id');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
  });

  it('should delete custom product', async () => {
    const custom = await global.createCustomProduct(
      Types.ObjectId().toHexString()
    );
    const token = await global.userLogin();
    const res = await request(app)
      .delete(`/api/v1/products/custom/${custom.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body.msg).toBe('Product deleted successfully');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
  });

  it('should return Resource not found error if no product is found ', async () => {
    const id = Types.ObjectId().toHexString();
    const token = await global.userLogin();

    const res = await request(app)
      .delete(`/api/v1/products/custom/${id}`)

      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(420);

    expect(res.body.msg).toBe('No Product found');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
  });

  it('should return Bad request if invalid product id is given ', async () => {
    const token = await global.userLogin();
    const res = await request(app)
      .delete(`/api/v1/products/custom/1234}`)

      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(res.body.msg).toBe('Invalid product id');
    expect(natsWrapper.client.publish).toHaveBeenCalledTimes(0);
  });
});
