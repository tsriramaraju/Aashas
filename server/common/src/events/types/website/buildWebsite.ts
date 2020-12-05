import { Subjects } from '../../subjects';

export interface BuildWebsite {
  subject: Subjects.BuildWebsite;
  data: {
    message: string;
    immediate: boolean;
  };
}
