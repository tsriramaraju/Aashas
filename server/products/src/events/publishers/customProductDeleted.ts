import { CustomProductDeletedEvent, Publisher, Subjects } from '@aashas/common';

export class CustomProductDeletedPublisher extends Publisher<CustomProductDeletedEvent> {
  readonly subject = Subjects.CustomProductDeleted;
}
