import {Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {UrlAwarePaginator} from '../pagination/url-aware-paginator.service';
import {MatSort} from '@angular/material';
import {Modal} from '../../core/ui/dialogs/modal.service';
import {ConfirmModalComponent} from '../../core/ui/confirm-modal/confirm-modal.component';
import {Settings} from '../../core/config/settings.service';
import {PaginatedDataTableSource} from '../data-table/data/paginated-data-table-source';
import { FileEntry } from '../../uploads/file-entry';
import { CurrentUser } from '../../auth/current-user';
import { UploadsApiService } from '../../uploads/uploads-api.service';

@Component({
    selector: 'file-entries-page',
    templateUrl: './file-entries-page.component.html',
    styleUrls: ['./file-entries-page.component.scss'],
    providers: [UrlAwarePaginator],
    encapsulation: ViewEncapsulation.None,
})
export class FileEntriesPageComponent implements OnInit, OnDestroy {
    @ViewChild(MatSort) matSort: MatSort;

    public dataSource: PaginatedDataTableSource<FileEntry>;

    constructor(
        public paginator: UrlAwarePaginator,
        public currentUser: CurrentUser,
        public settings: Settings,
        private uploads: UploadsApiService,
        private modal: Modal,
    ) {}

    ngOnInit() {
        this.dataSource = new PaginatedDataTableSource<FileEntry>({
            uri: 'uploads',
            dataPaginator: this.paginator,
            matSort: this.matSort
        });
    }

    ngOnDestroy() {
        this.paginator.destroy();
    }

    /**
     * Delete currently selected entries.
     */
    public deleteSelectedEntries() {
        const entryIds = this.dataSource.selectedRows
            .selected.map(entry => entry.id);

        this.uploads.delete({entryIds, deleteForever: true}).subscribe(() => {
            this.paginator.refresh();
            this.dataSource.selectedRows.clear();
        });
    }

    /**
     * Ask entry to confirm deletion of selected tags
     * and delete selected tags if entry confirms.
     */
    public maybeDeleteSelectedEntries() {
        this.modal.show(ConfirmModalComponent, {
            title: 'Delete Entries',
            body:  'Are you sure you want to delete selected entries?',
            ok:    'Delete'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.deleteSelectedEntries();
        });
    }
}
