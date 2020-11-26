import { CustomProductDoc } from '../../../interfaces/CustomProductsModel';
import { Subjects } from '../../subjects';

export interface CustomProductUpdatedEvent {
  subject: Subjects.CustomProductUpdated;
  data: {
    product: CustomProductDoc;
    version: number;
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
