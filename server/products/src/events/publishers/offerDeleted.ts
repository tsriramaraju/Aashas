import { OfferDeletedEvent, Publisher, Subjects } from '@aashas/common';

export class OfferDeletedPublisher extends Publisher<OfferDeletedEvent> {
  readonly subject = Subjects.OfferDeleted;
}
