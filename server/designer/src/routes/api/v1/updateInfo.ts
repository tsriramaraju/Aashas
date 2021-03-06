import { isAdmin, natsWrapper, ResourceNotFoundError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { BuildWebsitePublisher } from '../../../events';
import { designerValidation } from '../../../middleware/designerValidation';
import { updateInfo } from '../../../services/updateInfo';

const router = Router();

/**
 *  @desc      Updates existing designer data
 *  @route     put /api/v1/designer
 *  @access    Admin
 *  @returns   Status
 */

router.put(
  '/',
  [isAdmin, designerValidation],
  async (req: Request, res: Response) => {
    const { id } = req.currentUser!;

    const data = req.body;

    const designerDoc = await updateInfo(id, data);
    if (!designerDoc)
      throw new ResourceNotFoundError('Designer account not found');

    res.status(201).json({ msg: 'Info updated successfully' });

    new BuildWebsitePublisher(natsWrapper.client).publish({
      immediate: true,
      message: 'Designer info updated',
    });
  }
);

export { router as updateDesignerRouter };
