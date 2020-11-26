import { ProductDoc } from '../../..';
import { Subjects } from '../../subjects';

export interface OfferDeletedEvent {
  subject: Subjects.OfferDeleted;
  data: {
    product: ProductDoc;
    version: number;
  };
}
