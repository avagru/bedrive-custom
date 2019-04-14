import { DeleteTrashedEntriesForever, OpenConfirmDialog, RestoreTrashedEntries, } from '../../state/actions/commands';
import { Injectable } from '@angular/core';
import { DriveContextActions } from '../drive-context-actions';

const noopTrue = () => true;

@Injectable({
    providedIn: 'root'
})
export class TrashActions extends DriveContextActions {
    protected actions = [
        {
            viewName: 'Restore',
            icon: 'restore',
            showInCompact: true,
            execute: () => {
                this.store.dispatch(new RestoreTrashedEntries());
            },
            visible: noopTrue,
        },
        {
            viewName: 'Delete Forever',
            icon: 'delete-forever',
            showInCompact: true,
            execute: () => {
                this.deleteForever();
            },
            visible: noopTrue,
        },
    ];

    public deleteForever() {
        this.store.dispatch(new OpenConfirmDialog({
            title: 'Delete Forever',
            body: 'This will permanently delete selected items.',
            bodyBold: 'This action can not be undone.',
            ok: 'Delete Forever',
        }, new DeleteTrashedEntriesForever()));
    }
}
