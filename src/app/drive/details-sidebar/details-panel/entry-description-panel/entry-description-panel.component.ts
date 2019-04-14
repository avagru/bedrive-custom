import {
    Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, ViewChildren, QueryList, OnInit, AfterViewInit
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileEntry } from '../../../../../common/uploads/file-entry';
import { UpdateEntryDescription } from '../../../state/actions/commands';
import { Select, Store } from '@ngxs/store';
import { DriveState } from '../../../state/drive-state';
import { DriveEntry } from '../../../files/models/drive-entry';

@Component({
    selector: 'entry-description-panel',
    templateUrl: './entry-description-panel.component.html',
    styleUrls: ['./entry-description-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryDescriptionPanelComponent implements AfterViewInit {
    @Select(DriveState.selectedEntryOrActiveFolder) entry$: Observable<DriveEntry>;
    @ViewChildren('textArea') textArea: QueryList<ElementRef<HTMLTextAreaElement>>;
    public editingDescription$ = new BehaviorSubject(false);
    public savingDescription$ = new BehaviorSubject(false);

    constructor(private store: Store) {}

    public ngAfterViewInit() {
        this.textArea.changes.subscribe(queryList => {
            queryList.length && queryList.first.nativeElement.focus();
        });
    }

    public editDescription() {
        this.editingDescription$.next(true);
    }

    public updateDescription(entry: FileEntry, value: string) {
        this.editingDescription$.next(false);
        if (entry.description === value) return;
        this.savingDescription$.next(true);
        this.store.dispatch(new UpdateEntryDescription(entry, value)).subscribe(() => {
            this.savingDescription$.next(false);
        });
    }
}
