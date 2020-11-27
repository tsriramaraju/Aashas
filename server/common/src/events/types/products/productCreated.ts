import { ProductDoc } from '../../..';
import { Subjects } from '../../subjects';

export interface ProductCreatedEvent {
  subject: Subjects.ProductCreated;
  data: {
    product: ProductDoc;
    version: number;
  };
}
