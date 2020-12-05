import { Subjects } from '../subjects';
import Mongoose from 'mongoose';
import { authType } from '../../interfaces/enums';
export interface AccountCreatedEvent {
  subject: Subjects.AccountCreated;

  data: {
    id: Mongoose.Types.ObjectId | string;
    authMode: authType;
    name: string;
    email?: string;
    mobile?: number;
    profilePic?: String;
  };
}
