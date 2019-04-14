import { Injectable } from '@angular/core';
import { DriveFolder } from './folders/models/driveFolder';
import { ROOT_FOLDER, RootFolder } from './folders/root-folder';

@Injectable({
    providedIn: 'root'
})
export class DriveUrlsService {
    public driveRoot() {
        return '/drive';
    }

    public folder(folder: DriveFolder|RootFolder) {
        if (folder === ROOT_FOLDER) {
            return this.driveRoot();
        } else {
            return `/drive/folders/${(folder as DriveFolder).hash}`;
        }
    }
}
