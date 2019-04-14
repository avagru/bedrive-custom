import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../core/types/models/User';
import { UploadedFile } from '../uploads/uploaded-file';
import { AppHttpClient } from '../core/http/app-http-client.service';
import {BackendResponse} from '../core/types/backend-response';

@Injectable({
    providedIn: 'root',
})
export class Users {
    constructor(private http: AppHttpClient) {}

    /**
     * Get user matching specified ID.
     */
    public get(id: number, params?: { with?: string }): BackendResponse<{user: User}> {
        return this.http.get(`users/${id}`, params);
    }

    /**
     * Fetch users without pagination.
     */
    public getAll(params = null): Observable<User[]> {
        return this.http.get('users', params).pipe(map(response => response['data']));
    }

    /**
     * Create a new user.
     */
    public create(payload: Object) {
        return this.http.post('users', payload);
    }

    /**
     * Update existing user.
     */
    public update(id: number, payload: Object): Observable<User> {
        return this.http.put('users/' + id, payload);
    }

    /**
     * Change specified user password.
     */
    public changePassword(id: number, payload: Object): Observable<User> {
        return this.http.post('users/' + id + '/password/change', payload);
    }

    /**
     * Attach specified roles to user.
     */
    public attachRoles(id: number, payload = {}): Observable<any> {
        return this.http.post('users/' + id + '/roles/attach', payload);
    }

    /**
     * Detach specified roles from user.
     */
    public detachRoles(id: number, payload = {}): Observable<any> {
        return this.http.post('users/' + id + '/roles/detach', payload);
    }

    /**
     * Add specified permissions to user.
     */
    public addPermissions(id: number, payload = {}): Observable<{ data: User }> {
        return this.http.post('users/' + id + '/permissions/start', payload);
    }

    /**
     * Remove specified permissions from user.
     */
    public removePermissions(id: number, payload = {}): Observable<{ data: User }> {
        return this.http.post('users/' + id + '/permissions/remove', payload);
    }

    /**
     * Upload and attach avatar to specified user.
     */
    public uploadAvatar(id: number, files: UploadedFile[]): Observable<User> {
        const payload = new FormData();
        payload.append('avatar', files[0].native);
        return this.http.post('users/' + id + '/avatar', payload);
    }

    /**
     * Delete specified user's avatar.
     */
    public deleteAvatar(id: number): Observable<User> {
        return this.http.delete('users/' + id + '/avatar');
    }

    /**
     * Delete multiple users.
     */
    public deleteMultiple(ids: number[]) {
        return this.http.delete('users/delete-multiple', {ids});
    }

    //

    /**
     * Sync specified user tags.
     */
    public syncTags(id: number, payload: Object): Observable<Object> {
        return this.http.post('users/' + id + '/tags/sync', payload);
    }

    /**
     * Update details about user.
     */
    public updateDetails(id: number, payload: Object): Observable<User> {
        return this.http.put('users/' + id + '/details', payload);
    }

    /**
     * Add secondary email to specified user.
     */
    public addEmail(id: number, payload: Object): BackendResponse<{user: User}> {
        return this.http.post('users/' + id + '/emails/attach', payload);
    }

    /**
     * Remove secondary email from specified user.
     */
    public removeEmail(id: number, payload: Object): Observable<User> {
        return this.http.post('users/' + id + '/emails/detach', payload);
    }
}
