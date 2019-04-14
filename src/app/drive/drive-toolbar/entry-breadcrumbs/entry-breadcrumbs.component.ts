import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { DriveEntryApiService } from '../../drive-entry-api.service';
import { Store } from '@ngxs/store';
import { DriveState} from '../../state/drive-state';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Translations } from 'common/core/translations/translations.service';
import { ContextMenu, ContextMenuParams } from 'common/core/ui/context-menu/context-menu.service';
import { DriveContextMenuComponent } from '../../context-actions/components/drive-context-menu/drive-context-menu.component';
import { DriveFolder } from '../../folders/models/driveFolder';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { OpenFolder } from '../../state/actions/commands';
import { ROOT_FOLDER } from '../../folders/root-folder';
import { DriveFolderPage, DrivePage, ROOT_FOLDER_PAGE, SHARES_PAGE } from '../../state/models/drive-page';
import { DriveEntry } from '../../files/models/drive-entry';
import { Navigate } from '@ngxs/router-plugin';

@Component({
    selector: 'entry-breadcrumbs',
    templateUrl: './entry-breadcrumbs.component.html',
    styleUrls: ['./entry-breadcrumbs.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryBreadcrumbsComponent implements OnInit {
    public breadcrumb: BehaviorSubject<DrivePage[]> = new BehaviorSubject([]);

    constructor(
        private entriesApi: DriveEntryApiService,
        private i18n: Translations,
        private contextMenu: ContextMenu,
        private store: Store
    ) {}

    ngOnInit() {
        // wait until entries and user folders are loaded
        const sub = combineLatest(
            this.store.select(DriveState.meta),
            this.store.select(DriveState.userFoldersLoaded),
        ).subscribe(combined => {
            if (combined[0].currentPage && combined[1]) {
                this.bindToActivePage();
                sub && sub.unsubscribe();
            }
        });
    }

    public openPage(page: DrivePage) {
        if (page.folder) {
            this.store.dispatch(new OpenFolder(page.folder));
        } else {
            this.store.dispatch(new Navigate(['/drive/shares']));
        }
    }

    public openContextMenu(item: DrivePage, origin: HTMLElement) {
        let params = {originX: 'start', overlayX: 'start'} as ContextMenuParams;

        switch (item.name) {
            case 'trash':
                return this.contextMenu.open(DriveContextMenuComponent, origin, params);
            case 'root':
                return this.contextMenu.open(DriveContextMenuComponent, origin, params);
            case 'folder':
                params = {data: {entry: this.store.selectSnapshot(DriveState.activeFolder)}, ...params};
                return this.contextMenu.open(DriveContextMenuComponent, origin, params);
        }
    }

    private generateBreadCrumb(page: DrivePage, folders?: {[key: number]: DriveFolder}) {
        const breadcrumbs = [page.name === 'folder' ? this.getFolderRootBreadcrumb(page) : page];

        if (page.folder && page.folder !== ROOT_FOLDER) {
            const folderPath = this.getBreadcrumbForFolder(page.folder, folders);
            breadcrumbs.push(...folderPath);
        }

        this.breadcrumb.next(breadcrumbs);
    }

    private getBreadcrumbForFolder(folder: DriveEntry, allFolders: {[key: number]: DriveEntry}) {
        return folder.path.split('/').map(id => {
            const pathFolder = folder.id === +id ? folder : allFolders[id];
            return pathFolder && new DriveFolderPage(pathFolder);
        }).filter(f => !!f);
    }

    private getFolderRootBreadcrumb(page: DriveFolderPage) {
        const userOwnsFolder = this.store.selectSnapshot(DriveState.userOwnsActiveFolder);

        if ( ! page.folder || userOwnsFolder) {
            return ROOT_FOLDER_PAGE;
        } else {
            return SHARES_PAGE;
        }
    }

    private bindToActivePage() {
        combineLatest(
            this.store.select(DriveState.activePage),
            this.store.select(DriveState.flatFolders)
        ).pipe(
            distinctUntilChanged(),
            filter(combined => {
                // wait until folder data is fully loaded
                return ! combined[0].folderHash || combined[0].folder;
            })
        ).subscribe(combined => {
            this.generateBreadCrumb(combined[0], combined[1]);
        });
    }
}
