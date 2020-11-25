import { ProductDoc } from '../../..';
import {
  femaleType,
  kidsType,
  maleType,
} from '../../../interfaces/ProductsModel';
import { Subjects } from '../../subjects';

export interface OfferDeletedEvent {
  subject: Subjects.OfferDeleted;
  data: {
    product: ProductDoc<maleType | femaleType | kidsType>;
    version?: number;
  };
}
