import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/_models/Job';
import { JobsService } from 'src/app/_services/jobs.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: Job;
  constructor(private jobService: JobsService, private route: ActivatedRoute) { }

  ngOnInit(): void {

   this.loadJobPost();
  }


  loadJobPost() {
    
    this.jobService.getJob(this.route.snapshot.params.id).subscribe(jobPost => {
      this.job = jobPost;
     // console.log(this.job)
    })
  }

}
