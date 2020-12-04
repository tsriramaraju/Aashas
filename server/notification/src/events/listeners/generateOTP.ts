import { GenerateOTPEvent, Listener, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { emailNotification } from '../../services/emailNotification';
import { mobileNotification } from '../../services/mobileNotification';
import { queueGroupName } from '../queueGroupName';

export class GenerateOTPListener extends Listener<GenerateOTPEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.GenerateOTP;

  async onMessage(data: GenerateOTPEvent['data'], msg: Message) {
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
    });

    msg.ack();
  }
}
