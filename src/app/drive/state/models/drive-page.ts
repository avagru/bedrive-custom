import { DrivePageType } from './available-pages';
import { DriveFolder } from '../../folders/models/driveFolder';
import { ROOT_FOLDER, RootFolder } from '../../folders/root-folder';
import { SortColumn, SortDirection } from '../../entries/available-sorts';

export const DRIVE_PAGE_NAMES: {[key: string]: DrivePageType} = {
    FOLDER: 'folder',
    RECENT: 'recent',
    TRASH: 'trash',
    SHARES: 'shares',
    STARRED: 'starred',
    ROOT: 'root',
    SEARCH: 'search',
};

export class DrivePage implements DrivePageParams {
    name = null;
    viewName = null;
    folder = null;
    folderHash = null;
    hasActions = false;
    sortColumn = 'updated_at' as SortColumn;
    sortDirection = 'desc' as SortDirection;
    queryParams = {};

    constructor(params: DrivePageParams) {
        Object.keys(params).forEach(key => {
            this[key] = params[key];
        });
    }
}

export interface DrivePageParams {
    name: DrivePageType;
    viewName: string;
    folder?: DriveFolder|RootFolder;
    folderHash?: string;
    hasActions?: boolean;
    disableSort?: boolean;
    sortColumn?: SortColumn;
    queryParams?: object;
    sortDirection?: SortDirection;
}

export class DriveFolderPage extends DrivePage {
    constructor(
        folder?: DriveFolder|RootFolder
    ) {
        super({
            folder,
            name: DRIVE_PAGE_NAMES.FOLDER,
            hasActions: true,
            viewName: folder === ROOT_FOLDER ? 'Drive' : (folder as DriveFolder).name,
            folderHash: folder ? folder['hash'] : null,
        });
    }
}

export const RECENT_PAGE = new DrivePage({
    name: DRIVE_PAGE_NAMES.RECENT,
    viewName: 'Recent',
    disableSort: true,
    sortColumn: 'created_at',
    sortDirection: 'desc',
    queryParams: {
        recentOnly: true,
    }
});

export const SEARCH_PAGE = new DrivePage({
    name: DRIVE_PAGE_NAMES.SEARCH,
    viewName: 'Search results',
});

export const SHARES_PAGE = new DrivePage({
    name: DRIVE_PAGE_NAMES.SHARES,
    viewName: 'Shared with me',
    queryParams: {
        sharedOnly: true,
    }
});

export const TRASH_PAGE = new DrivePage({
    name: DRIVE_PAGE_NAMES.TRASH,
    viewName: 'Trash',
    hasActions: true,
    queryParams: {
        deletedOnly: true,
    }
});

export const STARRED_PAGE = new DrivePage({
    name: DRIVE_PAGE_NAMES.STARRED,
    viewName: 'Starred',
    queryParams: {
        starredOnly: true,
    }
});

export const ROOT_FOLDER_PAGE = new DrivePage({
    name: DRIVE_PAGE_NAMES.ROOT,
    viewName: 'Drive',
    folder: ROOT_FOLDER,
    hasActions: true,
});

export const FOLDER_PAGE = new DrivePage({
    name: DRIVE_PAGE_NAMES.FOLDER,
    viewName: null,
    hasActions: true
});
