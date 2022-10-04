import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Organization } from '../_models/organization';
import { User } from '../_models/user';
import { OrgParams } from '../_models/orgParams';

import { getPaginationHeaders, getPaginatedResult } from './paginationHelper';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

    baseUrl = environment.apiUrl;
    organizations: Organization[] = [];
    organizationCache = new Map();
    orgParams: OrgParams;

    getOrgParams() {
        return this.orgParams;
    }

    setOrgParams(params: OrgParams) {
        this.orgParams = params;
    }

    resetOrgParams() {
        this.orgParams = new OrgParams();
        return this.orgParams;
    }

    constructor(private http: HttpClient) {
            this.orgParams = new OrgParams();
    }

    getOrganizations(orgParams: OrgParams) {
        var response = this.organizationCache.get(Object.values(OrgParams).join('-'));
        if (response) {
            return of(response);
        }

        let params = getPaginationHeaders(orgParams.pageNumber, orgParams.pageSize);

        params = params.append('orderBy', orgParams.orderBy);

        return getPaginatedResult<Member[]>(this.baseUrl + 'organizations', params, this.http)
            .pipe(map(response => {
                this.organizationCache.set(Object.values(orgParams).join('-'), response);
                return response;
            }));
    }

    //Change to ID
    getOrganization(orgId: number) {
        const member = [...this.organizationCache.values()]
            .reduce((arr, elem) => arr.concat(elem.result), [])
            .find((organization: Organization) => organization.id === orgId);

        if (member) {
            return of(member);
        }
        return this.http.get<Member>(this.baseUrl + 'organizations/' + orgId);
    }

    ////Check with nathan
    getOrgByPosterId(id: number, orgParams: OrgParams) {
        let params = getPaginationHeaders(orgParams.pageNumber, orgParams.pageSize);
    
    
        return getPaginatedResult<Organization[]>(this.baseUrl+'jobs/poster/'+id, params, this.http)
                .pipe(map(response => {
                    //this.jobCache.set(Object.values(jobsParams).join('-'), response);
                    return response;
                }));
      }

    updateOrganization(organization: Organization) {
        return this.http.put(this.baseUrl + 'organizations', organization).pipe(
            map(() => {
                const index = this.organizations.indexOf(organization);
                this.organizations[index] = organization;
            })
        );
    }

    setMainPhoto(photoId: number) {
        return this.http.put(this.baseUrl + 'organizations/set-main-photo/' + photoId, {});
    }

    deletePhoto(photoId: number) {
        return this.http.delete(this.baseUrl + 'organizations/delete-photo/' + photoId, {})
    }

    addLike(orgName: string) {
        return this.http.post(this.baseUrl + 'likes/' + orgName, {});
    }

    getLikes(predicate: string, pageNumber, pageSize) {
        let params = getPaginationHeaders(pageNumber, pageSize);
        params = params.append('predicate', predicate);
        return getPaginatedResult<Partial<Member[]>>(this.baseUrl + 'likes', params, this.http);
    }

    //Add new organization
    //please add method call in registerOrganization() method in the organization-register.ts component
    registerOrganization(model: any){
        console.log(model);
        return this.http.post(this.baseUrl + 'organizations/add/', model);
    }

    //Add Member

    
}
