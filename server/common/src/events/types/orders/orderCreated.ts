import { OrderDoc } from '../../../interfaces/OrdersModel';
import { Subjects } from '../../subjects';

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    order: OrderDoc;
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
