import { CustomProductUpdatedEvent, Publisher, Subjects } from '@aashas/common';

export class CustomProductUpdatedPublisher extends Publisher<CustomProductUpdatedEvent> {
  readonly subject = Subjects.CustomProductUpdated;
}
