import {
    CopySelectedEntries, DeleteSelectedEntries, DownloadEntries, OpenDialog, OpenFilePreview, RemoveEntries,
} from '../../state/actions/commands';
import { Injectable } from '@angular/core';
import { DriveContextActions } from '../drive-context-actions';
import { ShareLinkDialogComponent } from '../../sharing/share-link-dialog/share-link-dialog.component';
import { Store } from '@ngxs/store';
import { CurrentUser } from 'common/auth/current-user';
import { SharesApiService } from '../../sharing/shares-api.service';
import { DriveEntryPermissions } from '../../permissions/drive-entry-permissions';
import { ShareDialogComponent } from '../../sharing/share-dialog/share-dialog.component';
import { RenameEntryDialogComponent } from '../../entries/rename-entry-dialog/rename-entry-dialog.component';
import { DriveState } from '../../state/drive-state';

const noopTrue = () => true;

@Injectable({
    providedIn: 'root'
})
export class SharesActions extends DriveContextActions {
    protected actions = [
        {
            viewName: 'Preview',
            icon: 'visibility',
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
            visible: () => {
                return this.userHasPermission('edit');
            },
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
            visible: () => {
                return !this.multipleEntriesSelected && this.userHasPermission('edit');
            }
        },
        {
            viewName: 'Rename',
            icon: 'edit',
            execute: () => {
                this.store.dispatch(new OpenDialog(RenameEntryDialogComponent, null, 'rename-entry-dialog-container'));
            },
            visible: () => {
                return !this.multipleEntriesSelected && this.userHasPermission('edit');
            }
        },
        {
            viewName: 'Add to my drive',
            icon: 'add-box',
            execute: () => {
                this.store.dispatch(new CopySelectedEntries());
            },
            visible: noopTrue,
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
            execute: () => {
                this.store.dispatch(new DownloadEntries());
            },
            visible: () => {
                return this.userHasPermission('download');
            },
        },
        {
            viewName: 'Delete',
            icon: 'delete',
            showInCompact: true,
            execute: () => {
                this.delete();
            },
            visible: noopTrue,
        },
    ];

    constructor(
        protected store: Store,
        protected currentUser: CurrentUser,
        protected shares: SharesApiService,
    ) {
        super(store);
    }

    protected userHasPermission(permission: keyof DriveEntryPermissions) {
        return this.getSelectedEntries().every(entry => {
            if ( ! entry.users) entry.users = [];
            const user = entry.users.find(u => u.id === this.currentUser.get('id'));
            return user && (user.owns_entry || user.entry_permissions[permission]);
        });
    }

    public delete() {
        const entries = this.getSelectedEntries();

        // if user owns or can edit selected entries, delete them
        if (this.store.selectSnapshot(DriveState.userCanEditSelectedEntries)) {
            this.store.dispatch(new DeleteSelectedEntries());

        // otherwise, just remove entries from user's "shared with me" page
        } else {
            this.shares.detachUser(
                this.currentUser.get('id'),
                entries.map(e => e.id),
            ).subscribe(() => {
                this.store.dispatch(new RemoveEntries(entries));
            });
        }
    }
}
