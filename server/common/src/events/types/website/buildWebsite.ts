import { Subjects } from '../../subjects';
import Mongoose from 'mongoose';

export interface BuildWebsite {
  subject: Subjects.BuildWebsite;
  data: {
    message: string;
    immediate: boolean;
  };
}
