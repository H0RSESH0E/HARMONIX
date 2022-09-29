import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Job } from '../_models/job';
import { getPaginationHeaders, getPaginatedResult} from './paginationHelper';

// const httpOptions = {
//     headers: new HttpHeaders({
//         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
//     })
// }

@Injectable({
    providedIn: 'root'
})
export class JobsService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // getJobs() {
    //     return this.http.get<Job[]>(this.baseUrl + 'jobs');
    // }

    getJobs(predicate: string, pageNumber, pageSize) {
        let params = getPaginationHeaders(pageNumber, pageSize);
        params = params.append('predicate', predicate);
        return getPaginatedResult<Partial<Job[]>>(this.baseUrl + 'jobs' , params, this.http);
    }

    getJob(id: number) {
        return this.http.get<Job>(this.baseUrl + 'jobs/' + id);
    }


    addSaveJob(id: number) {
        return this.http.post(this.baseUrl + 'savedJobs/' + id, {});
    };

    removeSaveJob(id: number) {
        return this.http.delete(this.baseUrl + 'savedJobs/delete-savedJob/' + id, {});
    };


    getSavedJobs(predicate: string, pageNumber, pageSize) {
        let params = getPaginationHeaders(pageNumber, pageSize);
        params = params.append('predicate', predicate);
        return getPaginatedResult<Partial<Job[]>>(this.baseUrl + 'savedJobs' , params, this.http);
    }
}
