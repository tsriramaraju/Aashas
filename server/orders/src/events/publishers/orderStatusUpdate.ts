import { OrderStatusUpdatedEvent, Publisher, Subjects } from '@aashas/common';

export class OrderStatusUpdatedPublisher extends Publisher<OrderStatusUpdatedEvent> {
  readonly subject = Subjects.OrderStatusUpdated;
}
