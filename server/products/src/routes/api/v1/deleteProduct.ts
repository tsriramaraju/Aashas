import { BadRequestError, ResourceNotFoundError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { statSync } from 'fs';
import { Types } from 'mongoose';
import { isAdmin } from '../../../middlewares/isAdmin';
import { deleteProduct } from '../../../services/deleteProduct';
import { getProducts } from '../../../services/getProducts';

const router = Router();

/**
 *  @desc      Delete list of all products
 *  @route     Delete /api/v1/products
 *  @access    Public
 *  @returns   Products array
 */
router.delete('/:id', isAdmin, async (req: Request, res: Response) => {
  const productID = req.params.id;

  if (!Types.ObjectId.isValid(productID))
    throw new BadRequestError('Invalid product id');

  const status = await deleteProduct(Types.ObjectId(productID));

  if (!status) throw new ResourceNotFoundError('No Product found');

  res.status(201).json({ msg: 'Product deleted successfully' });
  //  TODO : publish events

  //  TODO : algolia
});

export { router as deleteProductRouter };
