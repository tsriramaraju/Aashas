import { CustomProductDoc } from '../../../interfaces/CustomProductsModel';
import {
  femaleType,
  kidsType,
  maleType,
} from '../../../interfaces/ProductsModel';
import { Subjects } from '../../subjects';

export interface CustomProductCreatedEvent {
  subject: Subjects.CustomProductCreated;
  data: {
    product: CustomProductDoc<maleType | femaleType | kidsType>;
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
