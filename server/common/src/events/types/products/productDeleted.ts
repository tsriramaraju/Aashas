import { Subjects } from '../../subjects';

export interface ProductDeletedEvent {
  subject: Subjects.ProductDeleted;
  data: {
    productID: string;
    version: number;
  };
}
