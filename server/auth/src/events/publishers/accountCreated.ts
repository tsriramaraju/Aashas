import { Publisher, Subjects, AccountCreatedEvent } from '@aashas/common';

/**
 * Generate Reset event publisher for notifications service to send reset link to user's mail.
 */

export class AccountCreatedPublisher extends Publisher<AccountCreatedEvent> {
  subject: Subjects.AccountCreated = Subjects.AccountCreated;
}
