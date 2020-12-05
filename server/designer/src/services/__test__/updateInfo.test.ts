import { Types } from 'mongoose';
import { Designer } from '../../models/Designer';
import { updateInfo } from '../updateInfo';

describe('Update info service test group', () => {
  it('should update the info on valid input', async () => {
    const designer = await global.createDesigner();
    const preFetch = await Designer.findOne();

    expect(preFetch?.name).not.toBe('update');
    await updateInfo(designer.id, { name: 'update' });
    const postFetch = await Designer.findOne();

    expect(postFetch?.name).toBe('update');
  });

  it('should return null if no designer found', async () => {
    const update = await updateInfo(Types.ObjectId().toHexString(), {
      name: 'update',
    });
    expect(update).toBe(null);
  });
});
