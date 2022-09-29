import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/_models/Job';
import { JobsService } from 'src/app/_services/jobs.service';

import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-job-board',
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.css']
})
export class JobBoardComponent implements OnInit {

  jobs: Partial<Job[]>;
  predicate = 'jobs';
  pageNumber = 1;
  pageSize = 2;
  pagination: Pagination;



  constructor(private jobService: JobsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getJobs(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.jobs = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event :any) {
    this.pageNumber =event.page;
    this.loadJobs();
  }

}
