import { Store } from '@ngxs/store';
import { DriveState } from '../state/drive-state';
import { DriveContextAction } from './types/drive-context-action';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export abstract class DriveContextActions {
    protected multipleEntriesSelected: boolean;
    protected allStarred: boolean;
    protected onlyFoldersSelected: boolean;

    protected abstract actions: DriveContextAction[];

    constructor(protected store: Store) {}

    public getActions() {
        this.updateStatus();
        return this.actions;
    }

    protected getSelectedEntries() {
        return this.store.selectSnapshot(DriveState.selectedEntries);
    }

    protected updateStatus() {
        this.multipleEntriesSelected = this.store.selectSnapshot(DriveState.multipleEntriesSelected);
        this.allStarred = this.store.selectSnapshot(DriveState.allSelectedEntriesStarred);
        this.onlyFoldersSelected = this.store.selectSnapshot(DriveState.onlyFoldersSelected);
    }
}
