import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/_models/job';
import { Member } from 'src/app/_models/member';
import { JobsService } from 'src/app/_services/jobs.service';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {
  @Input() job: Job;

  constructor(private jobsService: JobsService, private toastr: ToastrService, 
    public presence: PresenceService) { }

  ngOnInit(): void {
  }

  addLike(job: Job) {
    this.jobsService.saveJob(job.id).subscribe(() => {
      this.toastr.success('You have liked ' + job.title);
    })
  }

}
