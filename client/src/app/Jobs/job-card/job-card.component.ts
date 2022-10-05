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

  constructor(private jobsService: JobsService, public memberService: MembersService, private toastr: ToastrService, 
    public presence: PresenceService) { }

  ngOnInit(): void {
    if(this.memberService.currMem)
    {
     this.memberService.getMember(this.memberService.currMem.username).subscribe(member =>{
       this.memberService.currMem = member;
       });
    }
  }

  addLike(job: Job) {
    this.jobsService.saveJob(job.id).subscribe(() => {
      this.toastr.success('You have saved ' + job.title);
      this.memberService.getMember(this.memberService.currMem.username).subscribe(member =>{
        this.memberService.currMem = member;
    });
    })
  }

  jobalreadyliked()
  {
    if(this.memberService.currMem.savedJobs !== null)
    {
      if(this.memberService.currMem.savedJobs.length > 0)
      {
        var x = this.memberService.currMem.savedJobs.find((obj) => {
      return obj.title === this.job.title && obj.confirmedOrgId === this.job.confirmedOrgId && obj.jobPosterId === this.job.jobPosterId ;}
      );
      }
    }
    //console.log(this.memberService.currMem + "here");
   
    return x;
    
  }

  removeSaveJob(job: Job) {
    this.jobsService.removeSaveJob(job.id).subscribe(() => {
      this.toastr.success('You have removed '+ job.title+  ' from saved jobs.');
      this.memberService.getMember(this.memberService.currMem.username).subscribe(member =>{
        this.memberService.currMem = member;
    });
    })

  }

}
