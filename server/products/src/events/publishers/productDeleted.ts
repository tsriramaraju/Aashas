import { ProductDeletedEvent, Publisher, Subjects } from '@aashas/common';

export class ProductDeletedPublisher extends Publisher<ProductDeletedEvent> {
  readonly subject = Subjects.ProductDeleted;
}
