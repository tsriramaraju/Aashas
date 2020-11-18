import { Subjects } from '../subjects';
import Mongoose from 'mongoose';
import { authType } from '../../interfaces/enums';
export interface AccountCreatedEvent {
  subject: Subjects.AccountCreated;
  data: {
    id: Mongoose.Types.ObjectId;
    data: {
      id: Mongoose.Types.ObjectId;
      authMode: authType;
      name: string;
      email?: string;
      mobile?: number;
      profilePic?: String;
    };
  };
}
