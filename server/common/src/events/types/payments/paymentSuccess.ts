import { Subjects } from '../../..';
import { paymentModes, paymentStatus } from '../../../interfaces/enums';

export interface PaymentSuccessEvent {
  subject: Subjects.PaymentSuccess;

  data: {
    orderId: string;

    version: number;

    paymentStatus: paymentStatus.paid;
    paymentMode: paymentModes;
  };
}
