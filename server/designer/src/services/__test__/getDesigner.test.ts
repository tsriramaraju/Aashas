import { Designer } from '../../models/Designer';
import { getDesigner } from '../getDesigner';

describe('Get designer service test group', () => {
  it('should give full designer details', async () => {
    await global.createDesigner();
    const designer = await Designer.findOne().lean();
    const res = await getDesigner('full');

    expect(designer?.bio).toBe(res?.bio);
    expect(designer?.blogs.length).toBe(res?.blogs.length);
    expect(designer?.email).toBe(res?.email);
    expect(designer?.image).toBe(res?.image);
    expect(designer?.mobile).toBe(res?.mobile);
    expect(designer?.name).toBe(res?.name);
  });

  it('should give basic designer info', async () => {
    await global.createDesigner();
    const designer = await Designer.findOne().select('-blogs').lean();
    const res = await getDesigner('info');
    expect(designer?.bio).toBe(res?.bio);
    expect(res?.blogs).toBe(undefined);
    expect(designer?.email).toBe(res?.email);
    expect(designer?.image).toBe(res?.image);
    expect(designer?.mobile).toBe(res?.mobile);
    expect(designer?.name).toBe(res?.name);
  });

  it('should give list of blogs', async () => {
    await global.createDesigner();
    const designer = await Designer.findOne().select('blogs').lean();
    const res = await getDesigner('blogs');
    expect(designer?.blogs.length).toBe(res?.blogs.length);
    expect(res?.bio).toBe(undefined);
    expect(res?.email).toBe(undefined);
    expect(res?.image).toBe(undefined);
    expect(res?.mobile).toBe(undefined);
    expect(res?.name).toBe(undefined);
  });

  it('should return null if no designer is found', async () => {
    const res = await getDesigner('blogs');
    expect(res).toBe(null);
  });
});
