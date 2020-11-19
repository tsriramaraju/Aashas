import { Account } from '../../models';
import { Message } from 'node-nats-streaming';
import { deleteAccount } from '../../services';
import { queueGroupName } from '../queueGroupName';
import {
  DatabaseConnectionError,
  Listener,
  ResourceNotFoundError,
  Subjects,
  UserDeletedEvent,
} from '@aashas/common';

/**
 * User deleted listener to delete user from database
 */
export class UserDeletedListener extends Listener<UserDeletedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.UserDeleted;

  async onMessage(data: UserDeletedEvent['data'], msg: Message) {
    const userId = data.id;

    const user = await Account.findById(userId);
    /**
     * Makes sure user exists
     */
    if (!user) throw new ResourceNotFoundError('Requesting user not found');

    try {
      await deleteAccount(userId);

      /**
       * Acknowledge the event bus only after successfully deleting the user
       */
      msg.ack();
    } catch (error) {
      throw new DatabaseConnectionError(error.message);
    }
  }
}
