import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { DriveState } from '../../state/drive-state';
import { Observable } from 'rxjs';
import { DriveEntry } from '../../files/models/drive-entry';
import { OpenFolder } from '../../state/actions/commands';

@Component({
    selector: 'details-panel',
    templateUrl: './details-panel.component.html',
    styleUrls: ['./details-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsPanelComponent {
    @Select(DriveState.selectedEntryOrActiveFolder) entry$: Observable<DriveEntry>;
    @Select(DriveState.selectedEntryParent) parent$: Observable<DriveEntry>;

    constructor(private store: Store) {}

    public openLocation() {
        const parent = this.store.selectSnapshot(DriveState.selectedEntryParent);
        this.store.dispatch(new OpenFolder(parent));
    }
}
