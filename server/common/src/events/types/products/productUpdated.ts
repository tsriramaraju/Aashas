import { ProductDoc } from '../../..';
import {
  femaleType,
  kidsType,
  maleType,
} from '../../../interfaces/ProductsModel';
import { Subjects } from '../../subjects';

export interface ProductUpdatedEvent {
  subject: Subjects.ProductUpdated;
  data: {
    product: ProductDoc<maleType | femaleType | kidsType>;
    version?: number;
  };
}
