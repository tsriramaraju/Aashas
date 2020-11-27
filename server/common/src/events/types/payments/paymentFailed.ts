import Mongoose from 'mongoose';
import { Subjects } from '../../..';
import { paymentModes, paymentStatus } from '../../../interfaces/enums';

export interface PaymentFailedEvent {
  subject: Subjects.PaymentFailed;

  data: {
    orderId: Mongoose.Types.ObjectId;

    version: number;

    paymentStatus: paymentStatus.failed;
    paymentMode: paymentModes;
  };
}
