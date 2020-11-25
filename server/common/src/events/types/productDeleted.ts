import { Types } from 'mongoose';
import { Subjects } from '../subjects';

export interface ProductDeletedEvent {
  subject: Subjects.ProductDeleted;
  data: {
    productID: Types.ObjectId;
    version?: number;
  };
}
