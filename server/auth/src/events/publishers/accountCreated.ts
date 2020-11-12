import { Publisher, Subjects, AccountCreatedEvent } from '@aashas/common';

/**
 * Creates Account created event publisher class.
 */

export class AccountCreatedPublisher extends Publisher<AccountCreatedEvent> {
  subject: Subjects.AccountCreated = Subjects.AccountCreated;
}
