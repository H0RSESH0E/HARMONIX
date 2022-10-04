import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/_models/Job';
import { Pagination } from 'src/app/_models/pagination';
import { JobsService } from 'src/app/_services/jobs.service';

@Component({
  selector: 'app-job-saved',
  templateUrl: './job-saved.component.html',
  styleUrls: ['./job-saved.component.css']
})
export class JobSavedComponent implements OnInit {

  jobs: Partial<Job[]>;

  predicate = 'savedJob';
  pageNumber = 1;
  pageSize = 2;
  pagination: Pagination;


  constructor(private jobService: JobsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.loadSavedJobs();
  }

  loadSavedJobs() {
    this.jobService.getSavedJobs(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      if (response.result && response.result.length <= 0) {
        this.toastr.error('You do not have any saved jobs.');
      }
      this.jobs = response.result;
      this.pagination = response.pagination;
    })
  }


  removeSaveJob(job: Job) {
    this.jobService.removeSaveJob(job.id).subscribe(() => {
      this.toastr.success('You have remove this from saved jobs.');
      this.loadSavedJobs();
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadSavedJobs();
  }



}
