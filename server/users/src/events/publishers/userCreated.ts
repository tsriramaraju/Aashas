import { Publisher, Subjects, UserCreatedEvent } from '@aashas/common';
/**
 * User created event publisher for notifications and auth service to remove the user.
 */

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
}
