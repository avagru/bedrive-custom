import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AssignUsersToRoleModalComponent} from './assign-users-to-role-modal/assign-users-to-role-modal.component';
import {CurrentUser} from '../../auth/current-user';
import {UrlAwarePaginator} from '../pagination/url-aware-paginator.service';
import {MatSort} from '@angular/material';
import {User} from '../../core/types/models/User';
import {Role} from '../../core/types/models/Role';
import {RoleService} from './role.service';
import {Toast} from '../../core/ui/toast.service';
import {Modal} from '../../core/ui/dialogs/modal.service';
import {ConfirmModalComponent} from '../../core/ui/confirm-modal/confirm-modal.component';
import {PaginatedDataTableSource} from '../data-table/data/paginated-data-table-source';
import { CrupdateRoleModalComponent } from './crupdate-role-modal/crupdate-role-modal.component';

@Component({
    selector: 'roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
    providers: [UrlAwarePaginator],
    encapsulation: ViewEncapsulation.None,
})
export class RolesComponent implements OnInit {
    @ViewChild(MatSort) matSort: MatSort;

    public dataSource: PaginatedDataTableSource<User>;

    /**
     * List of all available roles models.
     */
    public roles: Role[];

    /**
     * Currently selected role.
     */
    public selectedRole: Role = new Role();

    /**
     * RolesComponent Constructor.
     */
    constructor(
        private roleService: RoleService,
        private toast: Toast,
        private modal: Modal,
        public paginator: UrlAwarePaginator,
        public currentUser: CurrentUser,
    ) {}

    ngOnInit() {
        this.dataSource = new PaginatedDataTableSource<User>({
            uri: 'users',
            dataPaginator: this.paginator,
            matSort: this.matSort
        });

        this.refreshRoles().then(() => {
            this.dataSource.init({role_id: this.selectedRole.id});
        });
    }

    /**
     * Set given role as selected.
     */
    public selectRole(role: Role) {
        if (this.selectedRole !== role) {
            this.selectedRole = role;
            this.refreshRoleUsers(role);
            this.dataSource.selectedRows.clear();
        }
    }

    /**
     * Fetch all existing roles.
     */
    public refreshRoles() {
        return new Promise(resolve => {
            this.roleService.getRoles().subscribe(response => {
                this.roles = response.data;

                if (this.roles.length) {
                    // if no role is currently selected, select first
                    if ( ! this.selectedRole || ! this.selectedRole.id) {
                        this.selectRole(this.roles[0]);

                        // if role is selected, try to re-select it with the one returned from server
                    } else {
                        for (let i = 0; i < this.roles.length; i++) {
                            if (this.roles[i].id === this.selectedRole.id) {
                                this.selectedRole = this.roles[i];
                            }
                        }
                    }
                }

                resolve();
            });
        });
    }

    /**
     * Refresh users belonging to specified role.
     */
    public refreshRoleUsers(role: Role) {
        this.dataSource.setParams({role_id: role.id});
    }

    /**
     * Show modal for assigning new users to currently selected role.
     */
    public showAssignUsersModal() {
        this.modal.show(AssignUsersToRoleModalComponent, {role: this.selectedRole}).afterClosed().subscribe(data => {
            if ( ! data) return;
            this.refreshRoleUsers(this.selectedRole);
        });
    }

    /**
     * Show modal for editing user if user is specified
     * or for creating a new user otherwise.
     */
    public showCrupdateRoleModal(role?: Role) {
        this.modal.show(CrupdateRoleModalComponent, {role}).afterClosed().subscribe(data => {
            if ( ! data) return;
            this.refreshRoles();
        });
    }

    /**
     * Ask user to confirm deletion of selected role
     * and delete selected role if user confirms.
     */
    public maybeDeleteRole(role: Role) {
        this.modal.open(ConfirmModalComponent, {
            title: 'Delete Role',
            body:  'Are you sure you want to delete this role?',
            ok:    'Delete'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.deleteRole(role);
        });
    }

    /**
     * Delete specified role.
     */
    public deleteRole(role: Role) {
        this.roleService.delete(role.id).subscribe(() => {
            this.selectedRole = new Role();
            this.refreshRoles().then(() => {
                this.refreshRoleUsers(this.selectedRole);
            });
        });
    }

    /**
     * Ask user to confirm detachment of selected users from
     * currently selected role, and detach them if user confirms.
     */
    public maybeDetachUsers() {
        this.modal.show(ConfirmModalComponent, {
            title: 'Remove users from role',
            body:  'Are you sure you want to remove selected users from this role?',
            ok:    'Remove'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.removeUsersFromSelectedRole();
        });
    }

    /**
     * Remove users from selected role.
     */
    public removeUsersFromSelectedRole() {
        const ids = this.dataSource.selectedRows.selected.map(user => user.id);

        this.roleService.removeUsers(this.selectedRole.id, ids).subscribe(() => {
            this.refreshRoleUsers(this.selectedRole);
            this.dataSource.selectedRows.clear();
            this.toast.open('Users removed from role.');
        });
    }

    /**
     * Check if users can be assigned to selected role.
     */
    public canAssignUsers() {
        return this.selectedRole.id && !this.dataSource.selectedRows.hasValue() && !this.selectedRole.guests;
    }
}
