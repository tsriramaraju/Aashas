import { Subjects } from '../../..';
import { paymentModes, paymentStatus } from '../../../interfaces/enums';

export interface PaymentFailedEvent {
  subject: Subjects.PaymentFailed;

  data: {
    orderId: string;

    version: number;

    paymentStatus: paymentStatus.failed;
    paymentMode: paymentModes;
  };
}
