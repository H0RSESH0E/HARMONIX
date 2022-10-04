/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Job } from '../_models/job';
import { JobsParams } from '../_models/jobParams';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';



@Injectable({
    providedIn: 'root'
})
export class OrganizationService {
    baseUrl = environment.apiUrl;
    jobs: Job[] = [];
    jobCache = new Map();
    //user: User;
    jobsParams: JobsParams;
  
    getUserParams() {
      return this.jobsParams
    }
  
    setUserParams(params: JobsParams) {
      this.jobsParams = params;
    }
  
    resetUserParams() {
      this.jobsParams = new JobsParams();
      return this.jobsParams;
    }
  
    constructor(private http: HttpClient) {
  
      this.jobsParams = new JobsParams();
      
    }
  
    getOrgs(jobsParams: JobsParams) {
      var response = this.jobCache.get(Object.values(jobsParams).join('-'));
      if (response) {
        return of(response);
      }
  
      let params = getPaginationHeaders(jobsParams.pageNumber, jobsParams.pageSize);
  
      params = params.append('jobType', jobsParams.jobType);
      params = params.append('orderBy', jobsParams.orderBy);
  
      return getPaginatedResult<Job[]>(this.baseUrl + 'jobs', params, this.http)
        .pipe(map(response => {
          this.jobCache.set(Object.values(jobsParams).join('-'), response);
          return response;
        }));
    }
  
    getOrg(id: number) {
      const job = [...this.jobCache.values()]
        .reduce((arr, elem) => arr.concat(elem.result), [])
        .find((job: Job) => job.id === id);
  
      if (job) {
        return of(job);
      }
      return this.http.get<Job>(this.baseUrl + 'jobs/' + id);
    }
  
    //Need to be worked out with back end
    getOrgByPosterId(id: number) {
      const job = this.jobs.filter(x => x.jobPosterId === id);
      if (job !== undefined) return of(job);
      return this.http.get<Job>(this.baseUrl + 'poster/' + id);
    }
  
    updateOrg(job: Job) {
      return this.http.put(this.baseUrl + 'jobs', job).pipe(
        map(() => {
          const index = this.jobs.indexOf(job);
          this.jobs[index] = job;
        })
      );
    }
  
    likeOrg(id: number) {
      return this.http.post(this.baseUrl + 'likes/' + id, {});
    }
  
    getLikedOrgs(predicate: string, pageNumber, pageSize) {
      let params = getPaginationHeaders(pageNumber, pageSize);
      params = params.append('predicate', predicate);
      return getPaginatedResult<Partial<Job[]>>(this.baseUrl + 'likes', params, this.http);
    }
}*/