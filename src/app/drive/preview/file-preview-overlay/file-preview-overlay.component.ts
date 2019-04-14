import {
    Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, Inject, OnDestroy,
} from '@angular/core';
import { DriveEntry } from '../../files/models/drive-entry';
import { OverlayPanelRef } from 'common/core/ui/overlay-panel/overlay-panel-ref';
import { OVERLAY_PANEL_DATA } from 'common/core/ui/overlay-panel/overlay-panel-data';
import { DriveContextMenuComponent } from '../../context-actions/components/drive-context-menu/drive-context-menu.component';
import { ContextMenu } from 'common/core/ui/context-menu/context-menu.service';
import { PreviewFilesService } from 'common/file-preview/preview-files.service';
import { DownloadEntries } from '../../state/actions/commands';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { CurrentUser } from '../../../../common/auth/current-user';

export interface FilePreviewOverlayData {
    entries: DriveEntry[];
    activeEntry?: number;
    hideMoreOptionsBtn?: boolean;
}

@Component({
    selector: 'file-preview-overlay',
    templateUrl: './file-preview-overlay.component.html',
    styleUrls: ['./file-preview-overlay.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilePreviewOverlayComponent implements AfterViewInit, OnDestroy {
    @ViewChild('previewContainer', {read: ElementRef}) previewContainer: ElementRef;
    @ViewChild('moreOptionsButton', {read: ElementRef}) optionsButton: ElementRef;
    private downloadSub: Subscription;

    constructor(
        private store: Store,
        private el: ElementRef,
        private contextMenu: ContextMenu,
        private overlayRef: OverlayPanelRef,
        private previewFiles: PreviewFilesService,
        private currentUser: CurrentUser,
        @Inject(OVERLAY_PANEL_DATA) public data: FilePreviewOverlayData
    ) {}

    ngAfterViewInit() {
        this.bindToDownload();
        this.previewContainer.nativeElement.addEventListener('click', e => {
            if ( ! e.target.closest('.preview-object')) {
                this.overlayRef.close();
            }
        });
    }

    ngOnDestroy() {
        this.downloadSub.unsubscribe();
    }

    public openContextMenu() {
        const origin = this.optionsButton.nativeElement;
        this.contextMenu.open(DriveContextMenuComponent, origin, {data: {entry: this.previewFiles.getCurrent()}});
    }

    public closeOverlay() {
        this.overlayRef.close();
    }

    public canDownload() {
        return this.data.entries.every(entry => {
            if ( ! entry.users) entry.users = [];
            const user = entry.users && entry.users.find(u => u.id === this.currentUser.get('id'));
            return user && (user.owns_entry || user.entry_permissions.download);
        });
    }

    private bindToDownload() {
        this.downloadSub = this.previewFiles.download.subscribe(() => {
            const entries = this.previewFiles.getAllEntries();
            this.store.dispatch(new DownloadEntries(entries));
        });
    }
}
