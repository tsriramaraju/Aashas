import { isAdmin, ResourceNotFoundError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { getDesigner } from '../../../services/getDesigner';
import { updateInfo } from '../../../services/updateInfo';

const router = Router();

/**
 *  @desc      Get existing designer info
 *  @route     get /api/v1/designer/info
 *  @access    Admin
 *  @returns   Designer info
 */

router.get('/info', [isAdmin], async (req: Request, res: Response) => {
  const { id } = req.currentUser!;

  const designerDoc = await getDesigner({
    id,
    mode: 'info',
  });
  if (!designerDoc)
    throw new ResourceNotFoundError('Designer account not found');

  res.status(201).json(designerDoc);
});

export { router as getDesignerInfoRouter };
