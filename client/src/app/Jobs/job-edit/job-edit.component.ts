
import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';
import { Job } from 'src/app/_models/job';

import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { JobsService } from 'src/app/_services/jobs.service';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';
import { JobsParams } from 'src/app/_models/jobParams';
import { Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})

export class JobEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  job: Job = null;
  member: Member;
  user: User;
  jobParams: JobsParams;
  jobs: Job [];
  pagination: Pagination;
  //id: number;
  
  
  constructor(private memberService: MembersService, private jobService: JobsService,private accountService : AccountService
    ,private toastr: ToastrService ) { 
      this.jobParams = this.jobService.getUserParams();
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
      console.log(this.user);
      this.memberService.getMember(this.user.username).subscribe((m) => {
        this.loadJobsByUserId(m.id);
        this.member = m;
      });
    }

  ngOnInit(): void {


      
  }

  loadJob(jb: any)
  {
    this.job = jb;
  }

  UpdateJob(){
    console.log(this.job);
    this.jobService.updateJob(this.editForm.value,this.job.id).subscribe(() =>{
      this.toastr.success('Profile updated');
      this.editForm.reset(this.job);
    })
  }

  
  loadJobsByUserId(id: number)
  {
    console.log("HII");
    console.log(id);
    this.jobService.setUserParams(this.jobParams);
    this.jobService.getJobsByPosterId(id, this.jobParams).subscribe((response) => {
      if(response?.result?.length>0)
      {
        this.loadJob(response.result[0]);
      }
      console.log(response);
      console.log(response.result);
      this.jobs = response.result;
      this.pagination = response.pagination;
    });
  }

  loadJobFromCard(id: number)
  {
    this.jobService.getJob(id).subscribe(
      jb => {
        this.job = jb;
        this.editForm.reset(jb);
      }
    )
  }
  
  resetFilters() {
    this.jobParams = this.jobService.resetUserParams();
    this.loadJobsByUserId(this.member.id);
  }

  pageChanged(event: any) {
    this.jobParams.pageNumber = event.page;
    this.jobService.setUserParams(this.jobParams);
    this.loadJobsByUserId(this.member.id);
  }


}
