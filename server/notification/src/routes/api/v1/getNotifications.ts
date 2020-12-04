import { isAdmin } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { getNotification } from '../../../services/getNotifications';

const router = Router();

/**
 *  @desc      Get all notifications
 *  @route     get /api/v1/notifications
 *  @access    Admin
 *  @returns   list of all notifications
 */

router.get('/', [isAdmin], async (req: Request, res: Response) => {
  const notifications = await getNotification();
  res.status(201).json(notifications);
});

export { router as getNotificationsRouter };
