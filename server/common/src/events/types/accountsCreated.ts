import { Subjects } from '../subjects';

import { authType } from '../../interfaces/enums';
export interface AccountCreatedEvent {
  subject: Subjects.AccountCreated;

  data: {
    id: string;
    authMode: authType;
    name: string;
    email?: string;
    mobile?: number;
    profilePic?: String;
  };
}
