import { Publisher, Subjects, GenerateResetEvent } from '@aashas/common';

/**
 * Creates Generate Reset Link event publisher class.
 */

export class GenerateResetPublisher extends Publisher<GenerateResetEvent> {
  subject: Subjects.GenerateReset = Subjects.GenerateReset;
}
