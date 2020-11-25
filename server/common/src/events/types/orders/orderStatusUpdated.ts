import { Types } from 'mongoose';
import { Subjects } from '../../subjects';

export interface OrderStatusUpdatedEvent {
  subject: Subjects.OrderStatusUpdated;
  data: {
    orderID: Types.ObjectId;
    orderStatus: string;
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
