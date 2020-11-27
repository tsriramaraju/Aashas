import { OrderCreatedEvent, Publisher, Subjects } from '@aashas/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
