import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Actions, ofAction, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DriveState} from '../../state/drive-state';
import { DriveFolder } from '../../folders/models/driveFolder';
import { take } from 'rxjs/operators';
import { FoldersTreeService } from '../../sidebar/folders-tree/folders-tree.service';
import { BaseDialog } from 'common/core/ui/dialogs/base-dialog';
import { MoveEntries } from '../../state/actions/commands';
import { MoveEntriesFailed, MoveEntriesSuccess } from '../../state/actions/events';
import { DriveEntry } from '../../files/models/drive-entry';
import { ROOT_FOLDER, RootFolder } from '../../folders/root-folder';

@Component({
    selector: 'move-entries-dialog',
    templateUrl: './move-entries-dialog.component.html',
    styleUrls: ['./move-entries-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FoldersTreeService],
})
export class MoveEntriesDialogComponent extends BaseDialog implements OnInit {
    public selectedFolder: DriveFolder|RootFolder = ROOT_FOLDER;
    @Select(DriveState.selectedEntries) selectedEntries$: Observable<DriveEntry[]>;

    constructor(
        protected dialogRef: MatDialogRef<MoveEntriesDialogComponent>,
        protected store: Store,
        protected actions: Actions,
    ) {
        super();
    }

    ngOnInit() {
        const failure = this.actions.pipe(ofAction(MoveEntriesFailed)).subscribe(() => {
            this.loading.next(false);
        });

        const success = this.actions.pipe(ofAction(MoveEntriesSuccess), take(1))
            .subscribe(() => {
                this.selectedFolder = null;
                this.close();
            });

        this.addSubs(success, failure);
    }

    public confirm() {
        this.loading.next(true);
        this.store.dispatch(new MoveEntries(this.selectedFolder))
            .subscribe(() => {
                this.loading.next(false);
            });
    }

    public getRootFolder() {
        return ROOT_FOLDER;
    }

    public canMove(): boolean {
        const folder = this.selectedFolder,
            movingEntries = this.store.selectSnapshot(DriveState.selectedEntries);

        return DriveState.canMoveEntriesTo(movingEntries, folder);

        if ( ! folder) return false;

        // should not be able to move folder into it's
        // own child or same folder it's already in
        return movingEntries.findIndex(entry => {
            const movingEntryIntoOwnChild = folder.path.startsWith(entry.path),
                movingEntryIntoSameFolder = entry.parent_id === (folder.id === 'root' ? null : folder.id);
            return  movingEntryIntoOwnChild || movingEntryIntoSameFolder;
        }) === -1;
    }
}
