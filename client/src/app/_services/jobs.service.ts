import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Job } from '../_models/job';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  baseUrl = environment.apiUrl;
  jobs: Job[] = [];
  jobCache = new Map();
  user: User;
  userParams: UserParams;

  getUserParams() {
    return this.userParams
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  getJobs(userParams: UserParams) {
    var response = this.jobCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('jobType', userParams.jobType);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Job[]>(this.baseUrl + 'jobs', params, this.http)
      .pipe(map(response => {
        this.jobCache.set(Object.values(userParams).join('-'), response);
        return response;
      }));
  }

  getJob(id: number) {
    const job = [...this.jobCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((job: Job) => job.id === id);

    if (job) {
      return of(job);
    }
    return this.http.get<Job>(this.baseUrl + 'jobs/' + id);
  }

  getJobsByPosterId(id: number) {
    const job = this.jobs.filter(x => x.jobPosterId === id);
    if (job !== undefined) return of(job);
    return this.http.get<Job>(this.baseUrl + 'poster/' + id);
  }

  updateJob(job: Job) {
    return this.http.put(this.baseUrl + 'jobs', job).pipe(
      map(() => {
        const index = this.jobs.indexOf(job);
        this.jobs[index] = job;
      })
    );
  }

  saveJob(id: number) {
    return this.http.post(this.baseUrl + 'likes/' + id, {});
  }

  getSavedJobs(predicate: string, pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Job[]>>(this.baseUrl + 'likes', params, this.http);
  }
}
