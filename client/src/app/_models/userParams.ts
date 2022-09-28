import { User } from "./user";

export class UserParams {
  jobType: string;
  minAge = 18;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 5;
  orderBy = 'lastUpdated';

  constructor(user: User) {
    this.jobType = 'full-time';
  }
}