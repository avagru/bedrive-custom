import { DriveEntry } from '../../files/models/drive-entry';
import { DriveFolder } from '../../folders/models/driveFolder';
import { DriveApiIndexParams } from '../../drive-entry-api.service';
import { SortColumn } from '../../entries/available-sorts';
import { RootFolder } from '../../folders/root-folder';
import {
    DrivePage, FOLDER_PAGE, RECENT_PAGE, ROOT_FOLDER_PAGE, SEARCH_PAGE, SHARES_PAGE, STARRED_PAGE, TRASH_PAGE
} from '../models/drive-page';

export interface LoadEntriesAction {
    queryParams: DriveApiIndexParams;
    page?: DrivePage;
    folder?: DriveFolder|RootFolder;
    loadMore?: boolean;
}

export class RecentEntriesPageOpened implements LoadEntriesAction {
    static readonly type = '[Drive] Recent Entries Page Opened';
    public page = RECENT_PAGE;
    public queryParams = {orderBy: 'created_at' as SortColumn, recentOnly: true};
}

export class FolderPageOpened implements LoadEntriesAction {
    static readonly type = '[Drive] Folder Page Opened';
    public page: DrivePage;
    public queryParams = {};
    constructor(folderHash: string|'root') {
        const page = folderHash === 'root' ? ROOT_FOLDER_PAGE : FOLDER_PAGE;
        this.page = {...page, folderHash};
    }
}

export class SharesFolderOpened implements LoadEntriesAction {
    static readonly type = '[Drive] Shared with me folder opened';
    public page = SHARES_PAGE;
    public queryParams = {sharedOnly: true};
}

export class TrashPageOpened implements LoadEntriesAction {
    static readonly type = '[Drive] Trash Page Opened';
    public page = TRASH_PAGE;
    public queryParams = {deletedOnly: true};
}

export class SearchPageOpened implements LoadEntriesAction {
    static readonly type = '[Drive] Search Page Opened';
    public page = SEARCH_PAGE;
    constructor(public queryParams: {
        type?: string;
        query?: string;
    } = {}) {}
}

export class StarredPageOpened implements LoadEntriesAction {
    static readonly type = '[Drive] Starred Entries Page Opened';
    public page = STARRED_PAGE;
    public queryParams = {starredOnly: true};
}

export class EntriesSelectedViaDrag {
    static readonly type = '[Drive] Entries Selected Via Drag';
    constructor(public entries: DriveEntry[]) {}
}

export class EntrySelectedViaContextMenu {
    static readonly type = '[Drive] File Selected Via ContextMenu';
    constructor(public entries: DriveEntry[]) {}
}

export class EntryTapped {
    static readonly type = '[Drive] User Tapped File';
    constructor(public entry: DriveEntry, public ctrlKey = false) {}
}

export class EntryDoubleTapped {
    static readonly type = '[Drive] User Double Tapped Entry';
    constructor(public entry: DriveEntry) {}
}

export class FileDeleteSuccess {
    static readonly type = '[Drive] Successfully Deleted Files';
    constructor(public deletedFiles: DriveEntry[]) {}
}

export class EntryContextMenuOpened {
    static readonly type = '[Drive] Entry Context Menu Opened';
    constructor(public entry: DriveEntry) {}
}

export class NewFolderCreated {
    static readonly type = '[Drive] New Folder Created';
    constructor(public folder: DriveFolder) {}
}

export class EntryRenamed {
    static readonly type = '[Drive] Entry Renamed';
    constructor(public entry: DriveEntry, public newName: string) {}
}

export class StartedDragging {
    static readonly type = '[Drive] Started Dragging';
}

export class StoppedDragging {
    static readonly type = '[Drive] Stopped Dragging';
}

export class MoveEntriesSuccess {
    static readonly type = '[Drive API] Move Entries Success';
    constructor(
        public destination: number | 'root',
        public oldLocation: number | 'root',
        public entries: DriveEntry[]
    ) {}
}

export class MoveEntriesFailed {
    static readonly type = '[Drive API] Move Entries Failed';
    constructor(public messages: object) {}
}

export class TrashedEntriesDeleteSuccess {
    static readonly type = '[Drive API] Trashed Entries Delete Forever Success';
    constructor(public entries: DriveEntry[]) {}
}

export class TrashedEntriesRestoreSuccess {
    static readonly type = '[Drive API] Trashed Entries Restore Success';
    constructor(public entries: DriveEntry[]) {}
}

export class NotEnoughSpaceError {
    static readonly type = '[Drive] Not Enough Space Error';
}

export class UserSpaceUsageChanged {
    static readonly type = '[Drive] User Space Usage Changed';
}

export class BreakpointChanged {
    static readonly type = '[Drive] BreakpointChanged';
    constructor(public status: {isMobile: boolean}) {}
}


