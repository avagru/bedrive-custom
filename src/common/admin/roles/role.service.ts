import {Injectable} from '@angular/core';
import {HttpCacheClient} from '../../core/http/http-cache-client';
import {Observable} from 'rxjs';
import {Role} from '../../core/types/models/Role';

@Injectable({
    providedIn: 'root',
})
export class RoleService {

    constructor(private httpClient: HttpCacheClient) {}

    /**
     * Fetch all existing user roles.
     */
    public getRoles(): Observable<{data: Role[]}> {
        return this.httpClient.getWithCache('roles?per_page=15');
    }

    /**
     * Create a new role.
     */
    public createNew(data): Observable<Role> {
        return this.httpClient.post('roles', data);
    }

    /**
     * Update existing role.
     */
    public update(roleId, data): Observable<Role> {
        return this.httpClient.put('roles/' + roleId, data);
    }

    /**
     * Delete role with given id.
     */
    public delete(roleId: number): Observable<any> {
        return this.httpClient.delete('roles/' + roleId);
    }

    /**
     * Add users to given role.
     */
    public addUsers(roleId: number, emails: string[]): Observable<Role> {
        return this.httpClient.post('roles/' + roleId + '/add-users', {emails});
    }

    /**
     * Remove users from given role.
     */
    public removeUsers(roleId: number, userIds: number[]): Observable<Role> {
        return this.httpClient.post('roles/' + roleId + '/remove-users', {ids: userIds});
    }
}
