import { natsWrapper, ResourceNotFoundError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { UserDeletePublisher } from '../../../events';
import { queueGroupName } from '../../../events/queueGroupName';
import { isUser } from '../../../middlewares/isUser';
import { deleteUser } from '../../../services/deleteUser';

const router = Router();

/**
 *  @desc     Deletes user if no pending orders is find
 *  @route     DELETE /api/v1/users
 *  @access    User
 *  @returns   Status
 */

router.delete('/', isUser, async (req: Request, res: Response) => {
  const { id } = req.user!;

  const isDeleted = await deleteUser(id!);

  if (!isDeleted)
    throw new ResourceNotFoundError(
      "Makes sure the user don't have any pending orders"
    );

  new UserDeletePublisher(natsWrapper.client).publish({
    id: id!,
    mode: 'email',
    data: {
      body: 'User has been deleted',
      message: 'Deleted',
      email: req.user?.email,
    },
  });
  res.status(201).json({ msg: 'User deleted successfully' });
});

export { router as deleteUser };
