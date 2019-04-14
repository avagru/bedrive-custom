import {
    AddStar,
    CopySelectedEntries, DeleteSelectedEntries,
    DownloadEntries,
    OpenDialog,
    OpenFilePreview,
    RemoveStar
} from '../../state/actions/commands';
import { ShareDialogComponent } from '../../sharing/share-dialog/share-dialog.component';
import { ShareLinkDialogComponent } from '../../sharing/share-link-dialog/share-link-dialog.component';
import { CrupdateFolderDialogComponent } from '../../folders/components/crupdate-folder-dialog/crupdate-folder-dialog.component';
import { Injectable } from '@angular/core';
import { MoveEntriesDialogComponent } from '../../entries/move-entries-dialog/move-entries-dialog.component';
import { RenameEntryDialogComponent } from '../../entries/rename-entry-dialog/rename-entry-dialog.component';
import { DriveContextActions } from '../drive-context-actions';
import { DriveState } from '../../state/drive-state';

const noopTrue = () => true;

@Injectable({
    providedIn: 'root'
})
export class EntryActions extends DriveContextActions {
    protected actions = [
        {
            viewName: 'Preview',
            icon: 'visibility',
            showInCompact: true,
            execute: () => {
                this.store.dispatch(new OpenFilePreview());
            },
            visible: () => {
                return !this.onlyFoldersSelected;
            },
        },
        {
            viewName: 'Manage People',
            icon: 'person-add',
            showInCompact: true,
            execute: () => {
                this.store.dispatch(new OpenDialog(ShareDialogComponent, null, 'share-dialog-container'));
            },
            visible: noopTrue,
        },
        {
            viewName: 'Get shareable link',
            icon: 'link',
            execute: () => {
                this.store.dispatch(new OpenDialog(ShareLinkDialogComponent, null, {
                    panelClass: 'share-link-dialog-container',
                    autoFocus: false,
                }));
            },
            visible: () => !this.multipleEntriesSelected
        },
        {
            viewName: 'Add a star',
            icon: 'star',
            execute: () => {
                this.store.dispatch(new AddStar(this.getSelectedEntries()));
            },
            visible: () => !this.allStarred
        },
        {
            viewName: 'Remove star',
            icon: 'star-border',
            execute: () => {
                this.store.dispatch(new RemoveStar(this.getSelectedEntries()));
            },
            visible: () => this.allStarred
        },
        {
            viewName: 'New Folder',
            icon: 'create-new-folder',
            execute: () => {
                this.store.dispatch(new OpenDialog(CrupdateFolderDialogComponent, null, 'crupdate-folder-dialog-container'));
            },
            visible: () => {
                const folderIsSelected = this.store.selectSnapshot(DriveState.selectedFolderId);
                return !this.multipleEntriesSelected && !!folderIsSelected;
            }
        },
        {
            viewName: 'Move to',
            icon: 'subdirectory-arrow-right',
            execute: () => {
                this.store.dispatch(new OpenDialog(MoveEntriesDialogComponent, null, 'move-entries-dialog-container'));
            },
            visible: noopTrue,
        },
        {
            viewName: 'Rename',
            icon: 'edit',
            execute: () => {
                this.store.dispatch(new OpenDialog(RenameEntryDialogComponent, null, 'rename-entry-dialog-container'));
            },
            visible: () => !this.multipleEntriesSelected
        },
        {
            viewName: 'Make a copy',
            icon: 'content-copy',
            execute: () => {
                this.store.dispatch(new CopySelectedEntries());
            },
            visible: noopTrue,
        },
        {
            viewName: 'Download',
            icon: 'file-download',
            separatorAfter: true,
            execute: () => {
                this.store.dispatch(new DownloadEntries());
            },
            visible: noopTrue,
        },
        {
            viewName: 'Delete',
            icon: 'delete',
            showInCompact: true,
            execute: () => {
                this.store.dispatch(new DeleteSelectedEntries());
            },
            visible: noopTrue,
        },
    ];
}
