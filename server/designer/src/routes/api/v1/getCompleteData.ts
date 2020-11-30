import { isAdmin, ResourceNotFoundError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { getDesigner } from '../../../services/getDesigner';

const router = Router();

/**
 *  @desc      Get existing designer data
 *  @route     get /api/v1/designer
 *  @access    Admin
 *  @returns   Designer
 */

router.get('/', [isAdmin], async (req: Request, res: Response) => {
  const { id } = req.currentUser!;

  const designerDoc = await getDesigner({
    id,
    mode: 'full',
  });
  if (!designerDoc)
    throw new ResourceNotFoundError('Designer account not found');

  res.status(201).json(designerDoc);
});

export { router as getDesignerFullRouter };
