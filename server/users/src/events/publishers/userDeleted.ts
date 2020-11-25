import { Publisher, Subjects, UserDeletedEvent } from '@aashas/common';
/**
 * User deleted event publisher for notifications and auth service to remove the user.
 */

export class UserDeletePublisher extends Publisher<UserDeletedEvent> {
  readonly subject = Subjects.UserDeleted;
}
