import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DriveEntryUser } from '../../files/models/drive-entry';
import { DriveEntryPermissions } from '../../permissions/drive-entry-permissions';
import { ShareDialogEntryUser, RemoveUser, SaveChanges, ShareDialogState, UpdateUserPermissions } from '../state/share-dialog.state';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CurrentUser } from '../../../../common/auth/current-user';

@Component({
    selector: 'entries-access-table',
    templateUrl: './entries-access-table.component.html',
    styleUrls: ['./entries-access-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)'})),
            transition('void => *', [
                style({transform: 'translateX(-100%)'}),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({transform: 'translateX(100%)'}))
            ])
        ])
    ]
})
export class EntriesAccessTableComponent {
    @Select(ShareDialogState.usersWithAccess) users: Observable<ShareDialogEntryUser[]>;
    @Select(ShareDialogState.dirty) dirty: Observable<boolean>;
    @Select(ShareDialogState.loading) loading$: Observable<boolean>;

    constructor(
        private store: Store,
        public currentUser: CurrentUser,
    ) {}

    public updateUserPermissions(user: DriveEntryUser, newPermissions: DriveEntryPermissions) {
        this.store.dispatch(new UpdateUserPermissions(user, newPermissions));
    }

    public removeUser(user: DriveEntryUser) {
        this.store.dispatch(new RemoveUser(user));
    }

    public saveChanges() {
        this.store.dispatch(new SaveChanges());
    }

    trackByUser(index: number, user: DriveEntryUser): number { return user.id; }
}
