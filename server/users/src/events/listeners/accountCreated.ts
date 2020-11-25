import {
  AccountCreatedEvent,
  Listener,
  natsWrapper,
  Subjects,
} from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { User } from '../../models/Users';
import { UserCreatedPublisher } from '../publishers/userCreated';
import { queueGroupName } from '../queueGroupName';

export class AccountCreatedListener extends Listener<AccountCreatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.AccountCreated;

  async onMessage(data: AccountCreatedEvent['data'], msg: Message) {
    const user = User.build({
      id: data.id,
      isAdmin: false,
      authType: data.authMode,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
    });
    process.env.NODE_ENV !== 'test' && console.log(data.name + 'user saved');
    try {
      await user.save();

      new UserCreatedPublisher(natsWrapper.client).publish({
        id: user.id,
        mode: 'email',
        group: queueGroupName,
        data: {
          body: 'User created',
          message: `${user.name} is created`,
          email: user.email,
          name: user.name,
          title: 'User created event',
        },
      });

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
