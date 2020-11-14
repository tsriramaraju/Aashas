import { Publisher, GenerateOTPEvent, Subjects } from '@aashas/common';

/**
 * Generate OTP event publisher for notifications service to send otp to user
 */

export class GenerateOTPPublisher extends Publisher<GenerateOTPEvent> {
  subject: Subjects.GenerateOTP = Subjects.GenerateOTP;
}
