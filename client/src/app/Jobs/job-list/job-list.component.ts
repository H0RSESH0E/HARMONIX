import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { JOB_TYPE } from 'src/app/util/constants';
import { Job } from 'src/app/_models/job';
import { JobsParams } from 'src/app/_models/jobParams';
import { JobsService } from 'src/app/_services/jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Job [];
  user: User;
  member: Member;
  pagination: Pagination;
  postedByUser: Boolean;
  jobParams: JobsParams;
  title: string;
  jobTypeList = JOB_TYPE;

  constructor(private memberService: MembersService, private jobsService: JobsService, private accountService: AccountService) {
    this.jobParams = this.jobsService.getJobParams();
  }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobsService.setJobParams(this.jobParams);
    this.jobsService.getJobs(this.jobParams).subscribe((response) => {
      this.jobs = response.result;
      this.pagination = response.pagination;
    });
  }

  loadJobsByUserId(id: number)
  {
    this.jobsService.setJobParams(this.jobParams);
    this.jobsService.getJobsByPosterId(id, this.jobParams).subscribe((response) => {
      this.jobs = response.result;
      this.pagination = response.pagination;
    });
  }

  loadJobsByTitle(title: string)
  {
    this.jobsService.setJobParams(this.jobParams);
    this.jobsService.getJobsByTitle(title, this.jobParams).subscribe((response) => {
      this.jobs = response.result;
      this.pagination = response.pagination;
    });

  }

  resetFilters() {
    this.jobParams = this.jobsService.resetUserParams();
    this.loadJobs();
  }

  pageChanged(event: any) {
    this.jobParams.pageNumber = event.page;
    this.jobsService.setJobParams(this.jobParams);
    this.loadJobs();
  }
}
