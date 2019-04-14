import { EmptyTrash, OpenConfirmDialog, OpenDialog, OpenUploadWindow, } from '../../state/actions/commands';
import { Injectable } from '@angular/core';
import { DriveContextActions } from '../drive-context-actions';
import { CrupdateFolderDialogComponent } from '../../folders/components/crupdate-folder-dialog/crupdate-folder-dialog.component';

const noopTrue = () => true;

@Injectable({
    providedIn: 'root'
})
export class FolderActions extends DriveContextActions {
    protected actions = [
        {
            viewName: 'New Folder',
            icon: 'create-new-folder',
            execute: () => {
                this.store.dispatch(new OpenDialog(
                    CrupdateFolderDialogComponent,
                    null,
                    'crupdate-folder-dialog-container')
                );
            },
            visible: noopTrue,
            separatorAfter: true,
        },
        {
            viewName: 'Upload Files',
            icon: 'cloud-upload',
            execute: () => {
                this.openUploadWindow('file');
            },
            visible: noopTrue,
        },
        {
            viewName: 'Upload Folder',
            icon: 'upload-folder-custom',
            execute: () => {
                this.openUploadWindow('directory');
            },
            visible: noopTrue,
        },
    ];

    public openUploadWindow(type: 'file'|'directory') {
        this.store.dispatch(new OpenUploadWindow(type));
    }
}
