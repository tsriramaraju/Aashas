import { address, natsWrapper } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { userInfo } from 'os';
import { UserUpdatedPublisher } from '../../../events/publishers/userUpdated';
import { queueGroupName } from '../../../events/queueGroupName';
import { isUser } from '../../../middlewares/isUser';
import { addAddress } from '../../../services/addAddress';

const router = Router();

/**
 *  @desc      Add new address
 *  @route     Post /api/v1/users/address
 *  @access    User
 *  @returns   Status
 */

router.post('/address', isUser, async (req: Request, res: Response) => {
  const { id, name: userName, email } = req.user!;
  const {
    city,
    house,
    location,
    name,
    pin,
    state,
    street,
  } = req.body as address;
  const defaultAddress = req.body.default;

  const address: address = {
    city,
    house,
    location,
    name,
    pin,
    state,
    street,
  };

  const response = await addAddress({ id, address, defaultAddress });

  res.status(201).json({ msg: response });

  new UserUpdatedPublisher(natsWrapper.client).publish({
    id,
    mode: 'email',
    group: queueGroupName,
    data: {
      body: `${name} added to the address book`,
      message: 'Address added successfully',
      email,
      title: 'Address added ',
    },
  });
});

export { router as addAddress };
