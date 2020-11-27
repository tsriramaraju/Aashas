import { OrderDeletedEvent, Publisher, Subjects } from '@aashas/common';

export class OrderDeletedPublisher extends Publisher<OrderDeletedEvent> {
  readonly subject = Subjects.OrderDeleted;
}
