import { Types } from 'mongoose';
import { User } from '../../models/Users';
import { addFavourite } from '../addFavourites';
import { removeFavourites } from '../removeFavourites';

describe('Remove  Favourites service test group', () => {
  it('should remove all Favourites items if no product id is mentioned', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();

    await addFavourite({ prodId: Types.ObjectId(), userId: user?._id });
    await addFavourite({ prodId: Types.ObjectId(), userId: user?._id });

    await removeFavourites({ userId: user?._id });
    const user1 = await User.findOne().lean();
    expect(user1?.favourites?.length).toBe(undefined);
  });
  it('should remove specific product  if  product id is mentioned', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();
    const id = Types.ObjectId();
    await addFavourite({ prodId: id, userId: user?._id });
    await addFavourite({ prodId: Types.ObjectId(), userId: user?._id });

    await removeFavourites({ userId: user?._id, prodId: id });
    const user1 = await User.findOne().lean();
    expect(user1?.favourites?.length).toBe(1);
  });
});
