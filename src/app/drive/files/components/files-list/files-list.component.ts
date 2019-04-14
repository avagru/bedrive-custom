import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input} from '@angular/core';
import { DriveEntry } from '../../models/drive-entry';
import { Sort } from '@angular/material';
import { Store } from '@ngxs/store';
import { ReloadPageEntries } from '../../../state/actions/commands';
import { SortColumn, SortDirection } from '../../../entries/available-sorts';

@Component({
    selector: 'files-list',
    templateUrl: './files-list.component.html',
    styleUrls: ['./files-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesListComponent {
    @Input() entries: DriveEntry[];
    @Input() disableInteractions = false;

    constructor(private store: Store) {}

    public sortChange(e: Sort) {
        const params = {
            orderBy: e.active as SortColumn,
            orderDir: e.direction as SortDirection
        };

        if ( ! this.disableInteractions) {
            this.store.dispatch(new ReloadPageEntries(params));
        }
    }

    public isStarred(entry: DriveEntry): boolean {
        if ( ! entry.tags) return false;
        return !!entry.tags.find(tag => tag.name === 'starred');
    }
}
