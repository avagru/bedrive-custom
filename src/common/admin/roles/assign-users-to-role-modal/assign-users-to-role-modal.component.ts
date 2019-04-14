import {Component, ViewEncapsulation, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Role} from '../../../core/types/models/Role';
import {Toast} from '../../../core/ui/toast.service';
import {RoleService} from '../role.service';

export interface AssignUsersToRoleModalData {
    role?: Role;
}

@Component({
    selector: 'assign-users-to-role-modal',
    templateUrl: './assign-users-to-role-modal.component.html',
    styleUrls: ['./assign-users-to-role-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AssignUsersToRoleModalComponent implements OnInit {

    /**
     * Role users should be assigned to.
     */
    public role: Role;

    /*
     * Emails role should be assigned to.
     */
    public emails: any;

    /**
     * Errors returned from backend.
     */
    public errors: any = {};

    /**
     * AssignUsersToRoleModal Constructor.
     */
    constructor(
        private dialogRef: MatDialogRef<AssignUsersToRoleModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AssignUsersToRoleModalData,
        private toast: Toast,
        private roleService: RoleService,
    ) {
        this.resetState();
    }

    public close(data?: any) {
        this.resetState();
        this.dialogRef.close(data);
    }

    ngOnInit() {
        this.resetState();
        this.role = this.data.role;
    }

    public confirm() {
        const emails = this.emails.map(function(obj) {
           return obj.email;
        });

        this.roleService.addUsers(this.role.id, emails).subscribe(response => {
            this.close(response);
            this.toast.open('Users assigned to role');
        }, () => this.errors = {emails: true});
    }

    /**
     * Reset all modal state to default.
     */
    private resetState() {
        // empty string is needed for initial input, because we're going
        // to loop through this array and show input for every value.
        this.emails = [{email: ''}];
        this.errors = {};
    }

    /**
     * Add input field to assign one more user to role
     */
    public assignMoreUsers() {
        this.emails.push({email: ''});
    }

    /**
     * Remove assignee at given index.
     */
    public removeUser(index: number) {

        // if there's only one email object, empty it
        if (this.emails.length === 1) {
            this.emails[index].email = '';
        }

        // otherwise remove the whole object (and input)
        else {
            this.emails.splice(index, 1);
        }
    }
}
