import { CustomProductCreatedEvent, Publisher, Subjects } from '@aashas/common';

export class CustomProductCreatedPublisher extends Publisher<CustomProductCreatedEvent> {
  readonly subject = Subjects.CustomProductCreated;
}
