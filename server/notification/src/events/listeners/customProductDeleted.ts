import { CustomProductDeletedEvent, Listener, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { emailNotification } from '../../services/emailNotification';
import { mobileNotification } from '../../services/mobileNotification';
import { pushNotification } from '../../services/pushNotification';
import { queueGroupName } from '../queueGroupName';

export class CustomProductDeletedListener extends Listener<CustomProductDeletedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.CustomProductDeleted;

  async onMessage(data: CustomProductDeletedEvent['data'], msg: Message) {
    const notificationData = data.data;

    data.mode.forEach((mode) => {
      if (mode === 'email') {
        emailNotification({
          email: notificationData.email!,
          body: notificationData.body!,
          subject: notificationData.title,
        });
      }
      if (mode === 'message') {
        mobileNotification({
          mobile: notificationData.mobile!,
          message: notificationData.body!,
        });
      }
      if (mode === 'push notification') {
        pushNotification({
          id: data.clientID!,
          message: notificationData.body!,
        });
      }
    });

    msg.ack();
  }
}
