import { ContentChildren, Directive, ElementRef, NgZone, OnDestroy, OnInit, QueryList } from '@angular/core';
import { FilesGridItemComponent } from '../files/components/files-grid/files-grid-item/files-grid-item.component';
import { Store } from '@ngxs/store';
import { EntryDoubleTapped} from '../state/actions/events';
import { DragEntryService } from './drag-entry.service';
import { DeselectAllEntries, SelectEntries } from '../state/actions/commands';
import { EntryTapped } from '../state/actions/events';
import { DriveState } from '../state/drive-state';
import { DriveEntry } from '../files/models/drive-entry';
import { FilesDragSelectService } from './files-drag-select.service';
import { DriveDomCacheService } from './drive-dom-cache.service';

@Directive({
    selector: '[driveHammerInteractions]'
})
export class DriveHammerInteractionsDirective implements OnInit, OnDestroy {
    @ContentChildren(FilesGridItemComponent, {descendants: true}) gridItems: QueryList<FilesGridItemComponent>;

    private hammerManager: HammerManager;
    private panService: FilesDragSelectService|DragEntryService|null;

    constructor(
        private zone: NgZone,
        private el: ElementRef,
        private store: Store,
        private dragSelect: FilesDragSelectService,
        private dragEntry: DragEntryService,
        private domCache: DriveDomCacheService,
    ) {}

    ngOnInit() {
    }

    ngOnDestroy() {
        this.dragSelect.removeSelectBox();
    }
    ngAfterViewInit() {
        this.bindToHammer();
    }

    private bindToHammer() {
        let _this = this;
        setTimeout(function(){
            _this.createHammerManager();
            _this.onPanStart();
            _this.onPan();
            _this.onPanEnd();
            _this.onTap();
            _this.onDoubleTap();
        }, 200);
    }

    private createHammerManager() {
        this.zone.runOutsideAngular(() => {
            this.hammerManager = new Hammer.Manager(this.domCache.filesCont);

            const isMobile = this.store.selectSnapshot(DriveState.isMobile);

            const tap = new Hammer.Tap(),
                pan = new Hammer.Pan({enable: !isMobile}),
                doubleTap = new Hammer.Tap({ event: 'doubletap', taps: 2 });

            this.hammerManager.add([tap, doubleTap, pan]);
            this.hammerManager.get('doubletap').recognizeWith('tap');
        });
    }

    private onPanStart() {
        this.hammerManager.on('panstart', e => {
            const gridElement = this.getEntryEl(e);

            if (gridElement) {
                this.panService = this.dragEntry;
                const entry = this.getEntryByEl(gridElement),
                    selectedEntries = this.store.selectSnapshot(DriveState.selectedEntries);

                // select entry, if not already selected
                if ( ! selectedEntries.find(en => en.id === entry.id)) {
                    this.store.dispatch(new SelectEntries([this.getEntryByEl(gridElement)]));
                }
            } else {
                this.panService = this.dragSelect;
            }

            this.panService.start(e);
        });
    }

    private onPan() {
        this.hammerManager.on('pan', e => {
            if (this.panService) this.panService.move(e);
        });
    }

    private onPanEnd() {
        this.hammerManager.on('panend', () => {
            if (this.panService) this.panService.end();
        });
    }

    private onTap() {
        this.hammerManager.on('tap', e => {
            const entryEl = this.getEntryEl(e);
            this.dragSelect.removeSelectBox();

            if (entryEl) {
                this.store.dispatch(new EntryTapped(this.getEntryByEl(entryEl), e.srcEvent.ctrlKey));
            } else if (e.target.closest('.files-container')) {
                this.store.dispatch(new DeselectAllEntries());
            }
        });
    }

    private onDoubleTap() {
        this.hammerManager.on('doubletap', e => {
            const gridElement = this.getEntryEl(e);
            if ( ! gridElement) return;

            this.store.dispatch(new EntryDoubleTapped(
                this.getEntryByEl(gridElement)
            ));
        });
    }

    private getEntryEl(e: HammerInput) {
        return e.target.closest('.drive-entry') as HTMLElement;
    }

    private getEntryByEl(el: HTMLElement): DriveEntry {
        const id = +el.dataset.id;
        return this.store.selectSnapshot(DriveState.entries)
            .find(curr => curr.id === +id);
    }
}
