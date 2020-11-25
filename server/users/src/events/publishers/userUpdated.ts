import { Publisher, Subjects, UserUpdatedEvent } from '@aashas/common';
/**
 * User updated event publisher for notifications and auth service to remove the user.
 */

export class UserUpdatedPublisher extends Publisher<UserUpdatedEvent> {
  readonly subject = Subjects.UserUpdated;
}
