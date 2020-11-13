import {
  DatabaseConnectionError,
  Listener,
  ResourceNotFoundError,
  Subjects,
  UserDeletedEvent,
} from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Account } from '../../models';
import { deleteAccount } from '../../services';
import { queueGroupName } from '../queueGroupName';

export class UserDeletedListener extends Listener<UserDeletedEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.UserDeleted = Subjects.UserDeleted;

  async onMessage(data: UserDeletedEvent['data'], msg: Message) {
    const userId = data.id;

    const user = await Account.findById(userId);

    if (!user) throw new ResourceNotFoundError('Requesting user not found');

    try {
      await deleteAccount(userId);
      console.log('user deleted');

      msg.ack();
    } catch (error) {
      throw new DatabaseConnectionError(error.message);
    }
  }
}
