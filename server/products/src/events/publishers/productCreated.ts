import { ProductCreatedEvent, Publisher, Subjects } from '@aashas/common';

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
}
