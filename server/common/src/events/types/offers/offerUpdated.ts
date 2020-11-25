import { ProductDoc } from '../../..';
import {
  femaleType,
  kidsType,
  maleType,
} from '../../../interfaces/ProductsModel';
import { Subjects } from '../../subjects';

export interface OfferUpdatedEvent {
  subject: Subjects.OfferUpdated;
  data: {
    product: ProductDoc<maleType | femaleType | kidsType>;
    version?: number;
    clientID?: string;
    group?: string;
    mode: 'message' | 'email' | 'push notification';
    data: {
      title?: string;
      name?: string;
      email?: string;
      mobile?: number;
      message: string;
      body: string;
      img?: string;
    };
  };
}
