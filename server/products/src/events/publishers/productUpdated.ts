import { ProductUpdatedEvent, Publisher, Subjects } from '@aashas/common';

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  readonly subject = Subjects.ProductUpdated;
}
