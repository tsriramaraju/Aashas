import { OfferUpdatedEvent, Publisher, Subjects } from '@aashas/common';

export class OfferUpdatedPublisher extends Publisher<OfferUpdatedEvent> {
  readonly subject = Subjects.OfferUpdated;
}
