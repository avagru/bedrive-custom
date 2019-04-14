import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriveRoutingModule } from './drive-routing.module';
import { DriveComponent } from './drive.component';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule, MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule
} from '@angular/material';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FoldersTreeComponent } from './sidebar/folders-tree/folders-tree.component';
import { UiModule } from 'common/core/ui/ui.module';
import { FilesGridComponent } from './files/components/files-grid/files-grid.component';
import { FileThumbnailComponent } from './files/components/file-thumbnail/file-thumbnail.component';
import { FilesGridItemComponent } from './files/components/files-grid/files-grid-item/files-grid-item.component';
import { DriveHammerInteractionsDirective } from './interactions/drive-hammer-interactions.directive';
import { FileIconComponent } from './files/components/file-icon/file-icon.component';
import { AVAILABLE_CONTEXT_MENUS } from 'common/core/ui/context-menu/available-context-menus';
import { DRIVE_CONTEXT_MENUS } from './context-actions/drive-context-menus';
import { DriveContextMenuComponent } from './context-actions/components/drive-context-menu/drive-context-menu.component';
import { SidebarActionButtonsComponent } from './sidebar/sidebar-action-buttons/sidebar-action-buttons.component';
import { CrupdateFolderDialogComponent } from './folders/components/crupdate-folder-dialog/crupdate-folder-dialog.component';
import { RenameEntryDialogComponent } from './entries/rename-entry-dialog/rename-entry-dialog.component';
import { EntryDragPreviewComponent } from './interactions/entry-drag-preview/entry-drag-preview.component';
import { EntryBreadcrumbsComponent } from './drive-toolbar/entry-breadcrumbs/entry-breadcrumbs.component';
import { UploadsPanelComponent } from './uploads/uploads-panel/uploads-panel.component';
import { UploadsModule } from 'common/uploads/uploads.module';
import { MoveEntriesDialogComponent } from './entries/move-entries-dialog/move-entries-dialog.component';
import { FolderDropTargetDirective } from './interactions/drop-targets/folder-drop-target.directive';
import { DriveToolbarComponent } from './drive-toolbar/drive-toolbar.component';
import { ToolbarActionsComponent } from './drive-toolbar/toolbar-actions/toolbar-actions.component';
import { MainSearchbarComponent } from './search/main-searchbar/main-searchbar.component';
import { UploadDropzoneComponent } from './uploads/upload-dropzone/upload-dropzone.component';
import { EntriesContainerComponent } from './entries/entries-container/entries-container.component';
import { DetailsPanelComponent } from './details-sidebar/details-panel/details-panel.component';
import { FilePreviewOverlayComponent } from './preview/file-preview-overlay/file-preview-overlay.component';
import { FilePreviewModule } from 'common/file-preview/file-preview.module';
import { FilePreviewToolbarComponent } from './preview/file-preview-overlay/file-preview-toolbar/file-preview-toolbar.component';
import { OverlayHandler } from './state/handlers/overlay-handler';
import { DownloadHandler } from './state/handlers/donwlod-handler';
import { ToastHandler } from './state/handlers/toast-handler';
import { UploadPanelHandler } from './state/handlers/upload-panel-handler';
import { DialogHandler } from './state/handlers/dialog-handler';
import { SharingModule } from './sharing/sharing.module';
import { DetailsSidebarComponent } from './details-sidebar/details-sidebar.component';
import { FileListHeaderComponent } from './header/file-list-header/file-list-header.component';
import { DriveInfiniteScrollDirective } from './interactions/drive-infinite-scroll.directive';
import { ResetScrollHandler } from './state/handlers/reset-scroll-handler';
import { FilesListComponent } from './files/components/files-list/files-list.component';
import { ToggleSelectedClassDirective } from './interactions/toggle-selected-class.directive';
import { PageChangeHandler } from './state/handlers/page-change-handler';
import { PageLoadHandler } from './state/handlers/page-load-handler';
import { RemoveStarHandler } from './state/handlers/remove-star-handler';
import { NoFolderEntriesComponent } from './messages/no-folder-entries/no-folder-entries.component';
import { NoTrashedEntriesComponent } from './messages/no-trashed-entries/no-trashed-entries.component';
import { NoStarredEntriesComponent } from './messages/no-starred-entries/no-starred-entries.component';
import { NoRecentEntriesComponent } from './messages/no-recent-entries/no-recent-entries.component';
import { UploadsPanelItemComponent } from './uploads/uploads-panel/uploads-panel-item/uploads-panel-item.component';
import { NgxsModule } from '@ngxs/store';
import { ShareDialogState } from './sharing/state/share-dialog.state';
import { ShareLinkState } from './sharing/links/share-link.state';
import { DriveState } from './state/drive-state';
import { Settings } from 'common/core/config/settings.service';
import { ContextMenu } from 'common/core/ui/context-menu/context-menu.service';
import { UploadInputConfig } from 'common/uploads/upload-input-config';
import { OverlayPanel } from 'common/core/ui/overlay-panel/overlay-panel.service';
import { PreviewFilesService } from 'common/file-preview/preview-files.service';
import { AvailableSpaceIndicatorComponent } from './sidebar/available-space-indicator/available-space-indicator.component';
import { LoadingToastComponent } from './messages/loading-toast/loading-toast.component';
import { Toast } from 'common/core/ui/toast.service';
import { LinkPreviewContainerComponent } from './preview/link-preview-container/link-preview-container.component';
import { LinkPreviewPasswordPanelComponent } from './preview/link-preview-container/link-preview-password-panel/link-preview-password-panel.component';
import { ContextActionsContainerComponent } from './context-actions/components/context-actions-container/context-actions-container.component';
import { DRIVE_UPLOAD_INPUT_CONFIG } from './upload-input-config';
import { NoSearchEntriesComponent } from './messages/no-search-entries/no-search-entries.component';
import { EntryDescriptionPanelComponent } from './details-sidebar/details-panel/entry-description-panel/entry-description-panel.component';
import { FolderPreviewComponent } from './preview/folder-preview/folder-preview.component';
import { EntriesSortButtonComponent } from './header/entries-sort-button/entries-sort-button.component';
import { LoginComponent } from './login/login.component';
import { ProjectListComponent } from './project-list/project-list.component';

export const STATE_HANDLERS = [
    OverlayHandler,
    DownloadHandler,
    ToastHandler,
    UploadPanelHandler,
    DialogHandler,
    ResetScrollHandler,
    PageChangeHandler,
    PageLoadHandler,
    RemoveStarHandler,
];

@NgModule({
    imports: [
        CommonModule,
        UiModule,
        UploadsModule,
        DriveRoutingModule,
        FilePreviewModule,
        SharingModule,

        // material
        MatSidenavModule,
        MatTreeModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressBarModule,
        MatIconModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,

        // state
        NgxsModule.forFeature([
            DriveState,
            ShareDialogState,
            ShareLinkState,
        ]),
    ],
    declarations: [
        DriveComponent,
        SidebarComponent,
        FoldersTreeComponent,
        FilesGridComponent,
        FileThumbnailComponent,
        DriveHammerInteractionsDirective,
        FilesGridItemComponent,
        FileIconComponent,
        DriveContextMenuComponent,
        SidebarActionButtonsComponent,
        CrupdateFolderDialogComponent,
        RenameEntryDialogComponent,
        EntryDragPreviewComponent,
        DriveToolbarComponent,
        EntryBreadcrumbsComponent,
        UploadsPanelComponent,
        MoveEntriesDialogComponent,
        FolderDropTargetDirective,
        ToolbarActionsComponent,
        MainSearchbarComponent,
        UploadDropzoneComponent,
        NoFolderEntriesComponent,
        NoTrashedEntriesComponent,
        NoStarredEntriesComponent,
        NoRecentEntriesComponent,
        NoSearchEntriesComponent,
        EntriesContainerComponent,
        DetailsSidebarComponent,
        DetailsPanelComponent,
        FilePreviewOverlayComponent,
        FilePreviewToolbarComponent,
        FileListHeaderComponent,
        DriveInfiniteScrollDirective,
        FilesListComponent,
        ToggleSelectedClassDirective,
        UploadsPanelItemComponent,
        AvailableSpaceIndicatorComponent,
        LoadingToastComponent,
        LinkPreviewContainerComponent,
        LinkPreviewPasswordPanelComponent,
        ContextActionsContainerComponent,
        EntryDescriptionPanelComponent,
        FolderPreviewComponent,
        EntriesSortButtonComponent,
        LoginComponent,
        ProjectListComponent,
    ],
    entryComponents: [
        DriveContextMenuComponent,
        CrupdateFolderDialogComponent,
        RenameEntryDialogComponent,
        UploadsPanelComponent,
        MoveEntriesDialogComponent,
        FilePreviewOverlayComponent,
        LoadingToastComponent,
        FolderPreviewComponent,
    ],
    providers: [
        // fix angular lazy loaded entry components issue
        ContextMenu,
        OverlayPanel,
        PreviewFilesService,
        Toast,

        // handlers
        ...STATE_HANDLERS,
        {
            provide: AVAILABLE_CONTEXT_MENUS,
            useValue: DRIVE_CONTEXT_MENUS,
            multi: true,
        },
        {
            provide: DRIVE_UPLOAD_INPUT_CONFIG,
            deps: [Settings],
            useFactory: (settings) => {
                const uploadInputConfig: UploadInputConfig = {multiple: true};

                const extensions = settings.getJson('drive.validation.allowed_extensions');
                if (extensions) {
                    uploadInputConfig.extensions = extensions.map(ext => '.' + ext);
                }

                return uploadInputConfig;
            },
        },
    ]
})
export class DriveModule {
    constructor(private injector: Injector) {
        STATE_HANDLERS.forEach(handler => this.injector.get(handler));
    }
}
