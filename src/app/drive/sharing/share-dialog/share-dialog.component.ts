import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DRIVE_ENTRY_FULL_PERMISSIONS, DriveEntryPermissions } from '../../permissions/drive-entry-permissions';
import { ResetState, SetInitialUsers, ShareDialogState, ShareEntries, ShareEntriesFailed } from '../state/share-dialog.state';
import { FormControl } from '@angular/forms';
import { BackendErrorMessages } from 'common/core/types/backend-error-response';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'share-dialog',
    templateUrl: './share-dialog.component.html',
    styleUrls: ['./share-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareDialogComponent implements OnDestroy {
    @Select(ShareDialogState.loading) loading$: Observable<boolean>;

    private destroyed$ = new Subject();
    public errors: BehaviorSubject<BackendErrorMessages> = new BehaviorSubject({});
    public shareModel: { emails: FormControl, permissions: DriveEntryPermissions, };

    constructor(
        public dialogRef: MatDialogRef<ShareDialogComponent>,
        private store: Store,
        private actions$: Actions
    ) {
        this.resetModel();
        this.store.dispatch(new SetInitialUsers());

        this.bindToShareError();
        this.bindToShareModel();
    }

    ngOnDestroy() {
        this.store.dispatch(new ResetState());
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    public share() {
        const payload = {
            emails: this.shareModel.emails.value,
            permissions: this.shareModel.permissions,
        };

        this.store.dispatch(new ShareEntries(payload)).subscribe(() => {
            this.setErrorMessages();
            this.resetModel();
        });
    }

    private resetModel() {
        this.shareModel = {
            emails: new FormControl([]),
            permissions: DRIVE_ENTRY_FULL_PERMISSIONS
        };
    }

    private setErrorMessages(messages?: BackendErrorMessages) {
        this.errors.next(messages || {});
    }

    private bindToShareModel() {
        this.shareModel.emails.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.setErrorMessages());
    }

    private bindToShareError() {
        this.actions$.pipe(
            takeUntil(this.destroyed$),
            ofActionDispatched(ShareEntriesFailed)
        ).subscribe((action: ShareEntriesFailed) => {
            this.setErrorMessages(action.messages);
        });
    }
}
