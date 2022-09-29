import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/_models/Job';
import { JobsService } from 'src/app/_services/jobs.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {
  @Input() job: Job;
  
  
  constructor(private jobService: JobsService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
  }

  addSaveJob(job: Job) {    
    this.jobService.addSaveJob(job.id).subscribe(() => {
      this.toastr.success('You have saved this job.');
    })
  }

}
