import request from 'supertest';
import { app } from '../../../../app';
import { User } from '../../../../models/Users';

describe('Add Favourites items route test group', () => {
  it('should not access route if user token is not found', async () => {
    const res = await request(app)
      .post('/api/v1/users/favourites')
      .send({ product: '5fbb538e83f2340019cc44e1' })
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Authentication token is not present');
  });

  it('should give Bad request error if no prod id is given', async () => {
    const token = await global.userLogin();

    const preUser = await User.findOne({}).lean();
    expect(preUser!.favourites!.length).toBe(0);
    const res = await request(app)
      .post('/api/v1/users/favourites')

      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Product id not found');
  });

  it('should give Bad request error if no prod id is not valid object type', async () => {
    const token = await global.userLogin();

    const preUser = await User.findOne({}).lean();
    expect(preUser!.favourites!.length).toBe(0);
    const res = await request(app)
      .post('/api/v1/users/favourites')
      .send({ product: '5fbb538e83f234' })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body.msg).toBe('Invalid product id');
  });

  it('should add item successfully if item is not present in users data', async () => {
    const token = await global.userLogin();

    const preUser = await User.findOne({}).lean();
    expect(preUser!.favourites!.length).toBe(0);
    const res = await request(app)
      .post('/api/v1/users/favourites')
      .send({ product: '5fbb538e83f2340019cc44e1' })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const postUser = await User.findOne({}).lean();
    expect(postUser!.favourites!.length).toBe(1);
    expect(postUser!.favourites![0].toHexString()).toBe(
      '5fbb538e83f2340019cc44e1'
    );
    expect(res.body.msg).toBe('Favourite added successfully');
  });

  it('should not add duplicate entry if item  already exists', async () => {
    const token = await global.userLogin();

    const preUser = await User.findOne({}).lean();
    expect(preUser!.favourites!.length).toBe(0);
    const res = await request(app)
      .post('/api/v1/users/favourites')
      .send({ product: '5fbb538e83f2340019cc44e1' })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const postUser = await User.findOne({}).lean();
    expect(postUser!.favourites!.length).toBe(1);
    expect(postUser!.favourites![0].toHexString()).toBe(
      '5fbb538e83f2340019cc44e1'
    );
    expect(res.body.msg).toBe('Favourite added successfully');
    const res2 = await request(app)
      .post('/api/v1/users/favourites')
      .send({ product: '5fbb538e83f2340019cc44e1' })
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);
    const postUser1 = await User.findOne({}).lean();
    expect(postUser1!.favourites!.length).toBe(1);
    expect(postUser1!.favourites![0].toHexString()).toBe(
      '5fbb538e83f2340019cc44e1'
    );
    expect(res2.body.msg).toBe('Favourite added successfully');
  });
});
