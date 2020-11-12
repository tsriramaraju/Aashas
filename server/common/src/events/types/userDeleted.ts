import { Subjects } from '../subjects';
import Mongoose from 'mongoose';

export interface UserDeletedEvent {
  subject: Subjects.UserDeleted;
  data: {
    id: Mongoose.Types.ObjectId;
  };
}
