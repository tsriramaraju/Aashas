import { ProductDoc } from '../..';
import { femaleType, kidsType, maleType } from '../../interfaces/ProductsModel';
import { Subjects } from '../subjects';

export interface ProductCreatedEvent {
  subject: Subjects.ProductCreated;
  data: {
    product: ProductDoc<maleType | femaleType | kidsType>;
    version?: number;
  };
}
