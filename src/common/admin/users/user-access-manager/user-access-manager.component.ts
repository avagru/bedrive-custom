import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SelectPermissionsModalComponent} from '../../permissions/select-permissions-modal/select-permissions-modal.component';
import {SelectRolesModalComponent} from '../select-roles-modal/select-roles-modal.component';
import {User} from '../../../core/types/models/User';
import {Role} from '../../../core/types/models/Role';
import {Users} from '../../../auth/users.service';
import {RoleService} from '../../roles/role.service';
import {Modal} from '../../../core/ui/dialogs/modal.service';

@Component({
    selector: 'user-access-manager',
    templateUrl: './user-access-manager.component.html',
    styleUrls: ['./user-access-manager.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UserAccessManagerComponent implements OnInit  {

    /**
     * User that's being edited.
     */
    @Input() public user = new User();

    /**
     * Whether user access manager should be readonly
     * or allow adding/removing roles and permissions.
     */
    @Input() public readonly = false;

    /**
     * All existing roles.
     */
    public allRoles: Role[];

    /**
     * UserAccessManagerComponent Constructor.
     */
    constructor(
        public userService: Users,
        private roleService: RoleService,
        private modal: Modal,
    ) {}

    /**
     * Called after data-bound properties of a directive are initialized.
     */
    public ngOnInit() {
        this.fetchAllRoles();
    }

    /**
     * Open select roles modal.
     */
    public openSelectRolesModal() {
        const selected = this.user.roles.map(role => role.id);

        this.modal.open(
            SelectRolesModalComponent,
            {selected},
            'select-roles-modal-container'
        ).afterClosed().subscribe(roles => {
            if ( ! roles) return;
            this.attachRoles(roles);
        });
    }

    /**
     * Attach specified roles to user.
     */
    public async attachRoles(roles: number[]) {
        if (this.user.id) {
            await this.userService.attachRoles(this.user.id, {roles}).toPromise().catch(() => {});
        }

        roles.forEach(id => {
            const role = this.allRoles.find(role => role.id === id);
            if (role) this.user.roles.push(role);
        });
    }

    /**
     * Detach specified roles from user.
     */
    public async detachRoles(roles: number[]) {
        if (this.user.id) {
            await this.userService.detachRoles(this.user.id, {roles}).toPromise().catch(() => {});
        }

        this.user.roles = this.user.roles.filter(role => roles.indexOf(role.id) === -1);
    }

    /**
     * Open Selected permissions modal.
     */
    public openSelectPermissionsModal() {
        this.modal.open(
            SelectPermissionsModalComponent,
            null,
            {panelClass: 'select-permissions-modal-container'}
        ).afterClosed()
            .subscribe(permissions => {
                if ( ! permissions) return;
                this.addPermissions(permissions);
            });
    }

    /**
     * Add specified permissions to user.
     */
    public async addPermissions(permissions: string[]) {
        if (this.user.id) {
            await this.userService.addPermissions(this.user.id, {permissions}).toPromise().catch(() => {});
        }

        const newPermissions = {};
        permissions.forEach(permission => {
            newPermissions[permission] = 1;
        });

        this.user.permissions = Object.assign({}, this.user.permissions, newPermissions);
    }

    /**
     * Remove specified permissions from user.
     */
    public async removePermissions(permissions: string[]) {
        if (this.user.id) {
            await this.userService.removePermissions(this.user.id, {permissions}).toPromise().catch(() => {});
        }

        const newPermissions = {};
        for (let name in this.user.permissions as any) {
            if (permissions.indexOf(name) === -1) {
                newPermissions[name] = 1;
            }
        }

        this.user.permissions = newPermissions as any;
    }

    /**
     * Fetch all available roles, if component is not in readonly mode.
     */
    private fetchAllRoles() {
        if (this.readonly) return;

        this.roleService.getRoles()
            .subscribe(response => this.allRoles = response.data);
    }
}
