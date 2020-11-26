import { ProductDoc } from '../../..';
import { Subjects } from '../../subjects';

export interface ProductUpdatedEvent {
  subject: Subjects.ProductUpdated;
  data: {
    product: ProductDoc;
    version: number;
  };
}
