import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { DriveState} from './state/drive-state';
import { DriveDomCacheService } from './interactions/drive-dom-cache.service';
import { EntryDragPreviewComponent } from './interactions/entry-drag-preview/entry-drag-preview.component';
import { Observable, Subscription } from 'rxjs';
import {
    LoadUserFolders,
    LoadUserSpaceUsage,
    ResetState,
    SetCurrentUser, SetViewMode,
    ToggleSidebar,
    UploadFiles,
    IsConnect,
} from './state/actions/commands';
import { UploadedFile } from 'common/uploads/uploaded-file';
import { Settings } from 'common/core/config/settings.service';
import { CurrentUser } from 'common/auth/current-user';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BreakpointChanged } from './state/actions/events';
import { VIEW_MODE_KEY } from './state/models/drive-state-model';
import { LocalStorage } from 'common/core/services/local-storage.service';

@Component({
    selector: 'drive',
    templateUrl: './drive.component.html',
    styleUrls: ['./drive.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriveComponent implements OnInit, OnDestroy {
    @ViewChild('scrollContainer', {read: ElementRef}) scrollContainer: ElementRef;
    @ViewChild('filesContainer', {read: ElementRef}) filesContainer: ElementRef;
    @ViewChild(EntryDragPreviewComponent, {read: ElementRef}) dragPreview: ElementRef;
    @Select(DriveState.getAccessToken) accessToken$: Observable<string> 
    @Select(DriveState.dragging) dragging: Observable<boolean>;
    @Select(DriveState.detailsOpen) activityOpen$: Observable<boolean>;
    @Select(DriveState.sidebarOpen) sidebarOpen$: Observable<boolean>;
    @Select(DriveState.isConnect) isConnect$: Observable<boolean>;
    @Select(DriveState.loading) loading$: Observable<boolean>;
    @Select(DriveState.isMobile) isMobile$: Observable<boolean>;
    @Select(DriveState.canUpload) canUpload$: Observable<boolean>;

    private subscriptions: Subscription[] = [];
    public model: {email?: string, password?: string, remember?: boolean, hide?: boolean} = {remember: true, hide: true}
    public errors: {email?: string, password?: string} = {}
    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private currentUser: CurrentUser,
        private localStorage: LocalStorage,
        private domCache: DriveDomCacheService,
        private breakpoints: BreakpointObserver,
        public settings: Settings,
    ) {}

    ngOnInit() {
        this.setViewMode();
        this.observeBreakpointChanges();
        this.store.dispatch(new LoadUserFolders());
        this.store.dispatch(new LoadUserSpaceUsage());
        this.currentUser.userChanged.subscribe(user => {
            this.store.dispatch(new SetCurrentUser(user));
        });
        // TODO: refactor this once auth is moved to it's own store
        this.store.dispatch(new SetCurrentUser(this.currentUser.getModel()));
    }
    ngAfterViewInit() {
        this.cacheDemoElements();
    }
    ngOnDestroy() {
        this.store.dispatch(ResetState);
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.subscriptions = [];
    }

    public uploadFiles(files: UploadedFile[]) {
        this.store.dispatch(new UploadFiles(files));
    }

    public toggleSidebar() {
        this.store.dispatch(new ToggleSidebar());
    }

    public toggleConnectClick() {
        this.store.dispatch(new IsConnect());
    }

    private cacheDemoElements() {
        this.domCache.filesCont = this.filesContainer.nativeElement;
        this.domCache.scrollCont = this.scrollContainer.nativeElement;
        this.domCache.dragPreview = this.dragPreview.nativeElement;
    }

    private setViewMode() {
        this.store.dispatch(new SetViewMode(
            this.localStorage.get(VIEW_MODE_KEY, 'grid'))
        );
    }

    private observeBreakpointChanges() {
        const sub = this.breakpoints.observe('(max-width: 1100px)').subscribe(result => {
            this.store.dispatch(new BreakpointChanged({isMobile: result.matches}));
        });

        this.subscriptions.push(sub);
    }
}
