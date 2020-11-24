import { address } from '@aashas/common';
import { Router, Request, Response } from 'express';
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
  const { id } = req.user!;
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

  const response = await addAddress(id, address, defaultAddress);

  res.status(201).json({ msg: response });

  //  TODO : publish user updated event
});

export { router as addAddress };
