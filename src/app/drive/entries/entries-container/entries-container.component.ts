import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, OnInit, ElementRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { DriveState } from '../../state/drive-state';
import { DriveEntry } from '../../files/models/drive-entry';
import { Observable } from 'rxjs';
import { DrivePageType } from '../../state/models/available-pages';
import { Keybinds } from 'common/core/keybinds/keybinds.service';
import { SelectAllEntries } from '../../state/actions/commands';

@Component({
    selector: 'entries-container',
    templateUrl: './entries-container.component.html',
    styleUrls: ['./entries-container.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntriesContainerComponent implements OnInit {
    @HostBinding('attr.tabindex') tabindex = 0;
    @Select(DriveState.entries) entries$: Observable<DriveEntry[]>;
    @Select(DriveState.entriesEmpty) noEntries: Observable<boolean>;
    @Select(DriveState.viewMode) viewMode$: Observable<'list'|'grid'>;
    @Select(DriveState.activePageName) activePageName$: Observable<DrivePageType>;

    constructor(
        private store: Store,
        private el: ElementRef,
        private keybinds: Keybinds,
    ) {}

    ngOnInit() {
        this.keybinds.listenOn(this.el.nativeElement);
        this.keybinds.addWithPreventDefault('ctrl+a', () => {
            this.store.dispatch(new SelectAllEntries());
        });
    }
}
