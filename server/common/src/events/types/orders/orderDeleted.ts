import { Types } from 'mongoose';
import { OrderDoc } from '../../../interfaces/OrdersModel';
import { Subjects } from '../../subjects';

export interface OrderDeletedEvent {
  subject: Subjects.OrderDeleted;
  data: {
    orderID: Types.ObjectId;
    order: OrderDoc;
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
