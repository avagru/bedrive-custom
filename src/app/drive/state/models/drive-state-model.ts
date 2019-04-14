import { SortColumn, SortDirection } from '../../entries/available-sorts';
import { DriveEntry } from '../../files/models/drive-entry';
import { DriveFolder } from '../../folders/models/driveFolder';
import { DrivePage } from './drive-page';
import { UserSpaceUsage } from './user-space-usage';
import { User } from 'common/core/types/models/User';
import { RemoteUser } from './remote-user';
import { LocalStorage } from 'common/core/services/local-storage.service';

export interface DriveStateModel {
    isMobile: boolean;
    activePage: DrivePage;
    folderTree: DriveFolder[];
    flatFolders: {[key: number]: DriveFolder};
    userFoldersLoaded: boolean;
    entries: DriveEntry[];
    selectedEntries: DriveEntry[];
    spaceUsage: UserSpaceUsage;
    meta: {
        currentPage: number;
        lastPage: number;
        sortColumn: SortColumn;
        sortDirection: SortDirection;
        type?: string|null,
        query?: string|null
    };
    dragging: boolean;
    loading: boolean;
    uploadsPanelOpen: boolean;
    viewMode: 'list'|'grid';
    detailsVisible: boolean;
    sidebarOpen: boolean;
    isConnect: boolean;
    currentUser: User|null;
    remoteUser: RemoteUser|null;
}

export const VIEW_MODE_KEY = 'bedesk.viewMode';
