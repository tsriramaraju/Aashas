import { isAdmin, ResourceNotFoundError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { getDesigner } from '../../../services/getDesigner';

const router = Router();

/**
 *  @desc      Get existing designer data
 *  @route     get /api/v1/designer
 *  @access    Public
 *  @returns   Designer
 */

router.get('/', async (req: Request, res: Response) => {
  const designerDoc = await getDesigner('full');
  if (!designerDoc)
    throw new ResourceNotFoundError('Designer account not found');

  res.status(201).json(designerDoc);
});

export { router as getDesignerFullRouter };
