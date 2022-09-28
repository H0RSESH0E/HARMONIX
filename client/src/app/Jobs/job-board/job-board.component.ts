import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/_models/Job';
import { JobsService } from 'src/app/_services/jobs.service';

import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-board',
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.css']
})
export class JobBoardComponent implements OnInit {
  
  jobs: Job[];



  constructor(private jobService: JobsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs
    })
  }

}
