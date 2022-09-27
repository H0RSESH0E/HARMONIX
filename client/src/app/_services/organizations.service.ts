import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Organization } from '../_models/organization';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { getPaginationHeaders, getPaginatedResult } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  baseUrl = environment.apiUrl;
    organizations: Organization[] = [];
    organizationCache = new Map();
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

    getOrganizations(userParams: UserParams) {
        var response = this.organizationCache.get(Object.values(userParams).join('-'));
        if (response) {
            return of(response);
        }

        let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

        params = params.append('orderBy', userParams.orderBy);

        return getPaginatedResult<Member[]>(this.baseUrl + 'users', params, this.http)
            .pipe(map(response => {
                this.organizationCache.set(Object.values(userParams).join('-'), response);
                return response;
            }));
    }

    getOrganization(orgName: string) {
        const member = [...this.organizationCache.values()]
            .reduce((arr, elem) => arr.concat(elem.result), [])
            .find((organization: Organization) => organization.name === orgName);

        if (member) {
            return of(member);
        }
        return this.http.get<Member>(this.baseUrl + 'organizations/' + orgName);
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
}
