import { GenerateOTPEvent, Listener, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { emailNotification } from '../../services/emailNotification';
import { mobileNotification } from '../../services/mobileNotification';
import { pushNotification } from '../../services/pushNotification';
import { queueGroupName } from '../queueGroupName';

export class GenerateOTPListener extends Listener<GenerateOTPEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.GenerateOTP;

  async onMessage(data: GenerateOTPEvent['data'], msg: Message) {
    try {
      const notificationData = data.data;

      await pushNotification({
        id: data.clientID!,
        message: notificationData.message!,
      });

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
