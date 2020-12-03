import { ProductDoc } from '../../..';
import { Subjects } from '../../subjects';

export interface OfferCreatedEvent {
  subject: Subjects.OfferCreated;
  data: {
    product: ProductDoc;
    version: number;
    clientID?: string;
    group?: string;
    mode: ('message' | 'email' | 'push notification')[];
    data: {
      title: string;
      name?: string;
      email?: string;
      mobile?: number;
      message: string;
      body?: string;
      img?: string;
    };
  };
}
