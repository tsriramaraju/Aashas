import { OfferCreatedEvent, Publisher, Subjects } from '@aashas/common';

export class OfferCreatedPublisher extends Publisher<OfferCreatedEvent> {
  readonly subject = Subjects.OfferCreated;
}
