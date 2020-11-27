import { OrderPaymentUpdatedEvent, Publisher, Subjects } from '@aashas/common';

export class OrderPaymentUpdatedPublisher extends Publisher<OrderPaymentUpdatedEvent> {
  readonly subject = Subjects.OrderPaymentUpdated;
}
