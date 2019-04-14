import { EmptyTrash, OpenConfirmDialog, } from '../../state/actions/commands';
import { Injectable } from '@angular/core';
import { DriveContextActions } from '../drive-context-actions';

const noopTrue = () => true;

@Injectable({
    providedIn: 'root'
})
export class TrashPageActions extends DriveContextActions {
    protected actions = [
        {
            viewName: 'Empty Trash',
            icon: 'delete-forever',
            execute: () => {
                this.emptyTrash();
            },
            visible: noopTrue,
        },
    ];

    public emptyTrash() {
        this.store.dispatch(new OpenConfirmDialog({
            title: 'Empty Trash',
            body: 'All files and folders in your trash will be permanently deleted.',
            bodyBold: 'This action can not be undone.',
            ok: 'Empty Trash'
        }, new EmptyTrash()));
    }
}
