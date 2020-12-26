import { OrderDeletedEvent, Listener, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { emailNotification } from '../../services/emailNotification';
import { mobileNotification } from '../../services/mobileNotification';
import { pushNotification } from '../../services/pushNotification';
import { queueGroupName } from '../queueGroupName';

export class OrderDeletedListener extends Listener<OrderDeletedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OrderDeleted;

  async onMessage(data: OrderDeletedEvent['data'], msg: Message) {
    try {
      const notificationData = data.data;

      await pushNotification({
        id: data.clientID!,
        message: notificationData.body!,
      });

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
