import { Types } from 'mongoose';
import { paymentStatus } from '../../interfaces/enums';
import { Subjects } from '../subjects';

export interface OrderPaymentUpdatedEvent {
  subject: Subjects.OrderPaymentUpdated;
  data: {
    orderID: Types.ObjectId;
    paymentStatus: paymentStatus;
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
