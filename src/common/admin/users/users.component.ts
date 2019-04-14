import {Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {CrupdateUserModalComponent} from './crupdate-user-modal/crupdate-user-modal.component';
import {UrlAwarePaginator} from '../pagination/url-aware-paginator.service';
import {MatSort} from '@angular/material';
import {Users} from '../../auth/users.service';
import {Modal} from '../../core/ui/dialogs/modal.service';
import {User} from '../../core/types/models/User';
import {Role} from '../../core/types/models/Role';
import {ConfirmModalComponent} from '../../core/ui/confirm-modal/confirm-modal.component';
import {Settings} from '../../core/config/settings.service';
import {PaginatedDataTableSource} from '../data-table/data/paginated-data-table-source';
import {CurrentUser} from '../../auth/current-user';
import {Toast} from '../../core/ui/toast.service';
import {HttpErrors} from '../../core/http/errors/http-errors.enum';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    providers: [UrlAwarePaginator],
    encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit, OnDestroy {
    @ViewChild(MatSort) matSort: MatSort;

    public dataSource: PaginatedDataTableSource<User>;

    constructor(
        public paginator: UrlAwarePaginator,
        private userService: Users,
        private modal: Modal,
        public currentUser: CurrentUser,
        public settings: Settings,
        private toast: Toast,
    ) {}

    ngOnInit() {
        this.dataSource = new PaginatedDataTableSource<User>({
            uri: 'users',
            dataPaginator: this.paginator,
            matSort: this.matSort
        });
    }

    ngOnDestroy() {
        this.paginator.destroy();
    }

    /**
     * Delete currently selected users.
     */
    public deleteSelectedUsers() {
        const ids = this.dataSource.selectedRows.selected.map(user => user.id);
        this.userService.deleteMultiple(ids).subscribe(() => {
            this.paginator.refresh();
            this.dataSource.selectedRows.clear();
        }, errResponse => {
            this.toast.open(errResponse.messages.general || HttpErrors.Default);
        });
    }

    /**
     * Compile a string of roles user belongs to names.
     */
    public makeRolesList(roles: Role[]): string {
        return roles.map(role => role.name).join(', ');
    }

    /**
     * Compile a list of user's permissions.
     */
    public makePermissionsList(permissions: any[]): string {
        const list = [];

        for (const permission in permissions) {
            if (permissions[permission]) {
                list.push(permission);
            }
        }

        return list.join(', ');
    }

    /**
     * Ask user to confirm deletion of selected tags
     * and delete selected tags if user confirms.
     */
    public maybeDeleteSelectedUsers() {
        this.modal.show(ConfirmModalComponent, {
            title: 'Delete Users',
            body:  'Are you sure you want to delete selected users?',
            ok:    'Delete'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.deleteSelectedUsers();
        });
    }

    /**
     * Show modal for editing user if user is specified
     * or for creating a new user otherwise.
     */
    public showCrupdateUserModal(user?: User) {
        this.modal.open(
            CrupdateUserModalComponent,
            {user},
            'crupdate-user-modal-container'
        ).beforeClosed().subscribe(data => {
            if ( ! data) return;
            this.paginator.refresh();
        });
    }
}
