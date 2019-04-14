import { Injectable } from '@angular/core';
import { AppHttpClient } from 'common/core/http/app-http-client.service';
import { DriveEntryUser } from '../files/models/drive-entry';
import { DriveEntryPermissions } from '../permissions/drive-entry-permissions';
import { BackendResponse } from 'common/core/types/backend-response';
import { FileEntry } from 'common/uploads/file-entry';

interface UserChangeParams {
    users: {id: number, permissions: DriveEntryPermissions}[];
    entries: number[];
}

export interface DriveEntryApiParams {
    entries: FileEntry[];
    emails: string[];
    permissions: DriveEntryPermissions;
}

@Injectable({
    providedIn: 'root'
})
export class SharesApiService {
    constructor(private http: AppHttpClient) {}

    /**
     * Update users and permissions on specified entries.
     */
    public updateUsers(params: UserChangeParams): BackendResponse<{users: DriveEntryUser[]}> {
        return this.http.put('drive/shares/update-users', params);
    }

    /**
     * Attach specified users to entries.
     */
    public shareEntries(params: DriveEntryApiParams): BackendResponse<{users: DriveEntryUser[]}> {
        return this.http.post('drive/shares/add-users', {
            ...params,
            entries: params.entries.map(entry => entry.id)
        });
    }

    /**
     * Detach specified user from entries.
     */
    public detachUser(userId: number, entryIds: number[]): BackendResponse<void> {
        return this.http.delete('drive/shares/remove-user/' + userId, {entries: entryIds});
    }
}
