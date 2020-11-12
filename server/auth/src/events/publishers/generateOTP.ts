import { Publisher, GenerateOTPEvent, Subjects } from '@aashas/common';

/**
 * Creates Generate OTP event publisher class.
 */

export class GenerateOTPPublisher extends Publisher<GenerateOTPEvent> {
  subject: Subjects.GenerateOTP = Subjects.GenerateOTP;
}
