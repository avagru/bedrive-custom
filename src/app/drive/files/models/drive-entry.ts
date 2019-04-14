import { DriveEntryPermissions } from '../../permissions/drive-entry-permissions';
import { FileEntry } from 'common/uploads/file-entry';

export interface DriveEntry extends FileEntry {
    deleted_at: string;
    users: DriveEntryUser[];
}

export interface DriveEntryUser {
    id: number;
    email: string;
    display_name: string;
    avatar: string;
    owns_entry: boolean;
    entry_permissions: DriveEntryPermissions;
}
