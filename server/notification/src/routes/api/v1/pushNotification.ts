import { isAdmin, ServerError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { pushNotification } from '../../../services/pushNotification';

const router = Router();

/**
 *  @desc      send push Notification
 *  @route     push /api/v1/notifications
 *  @access    Admin
 *  @returns   status
 */

router.post('/', async (req: Request, res: Response) => {
  const data = req.body as {
    id: string;
    message: string;
    group?: string;
  };

  try {
    await pushNotification(data);
    res.status(201).json({ msg: 'success' });
  } catch (error) {
    throw new ServerError(error);
  }
});

export { router as pushNotificationRouter };
