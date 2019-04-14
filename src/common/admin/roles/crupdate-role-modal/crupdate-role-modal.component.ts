import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Role} from '../../../core/types/models/Role';
import {Toast} from '../../../core/ui/toast.service';
import {RoleService} from '../role.service';
import {Modal} from '../../../core/ui/dialogs/modal.service';

export interface CrupdateRoleModalData {
    role: Role;
}

@Component({
    selector: 'crupdate-role-modal',
    templateUrl: './crupdate-role-modal.component.html',
    styleUrls: ['./crupdate-role-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CrupdateRoleModalComponent implements OnInit {

    /**
     * Role model.
     */
    public model: Role;

    /**
     * If we are updating existing role or creating a new one.
     */
    public updating = false;

    /**
     * Errors returned from backend.
     */
    public errors: any = {};

    /**
     * CrupdateRoleModalComponent Constructor.
     */
    constructor(
        private toast: Toast,
        private roleService: RoleService,
        private modal: Modal,
        private dialogRef: MatDialogRef<CrupdateRoleModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdateRoleModalData,
    ) {
        this.resetState();
    }

    ngOnInit() {
        this.resetState();

        if (this.data.role) {
            this.updating = true;
            this.hydrateModel(this.data.role);
        } else {
            this.updating = false;
        }
    }

    public close(data = null) {
        this.resetState();
        this.dialogRef.close(data);
    }

    public confirm() {
        let request;

        if (this.updating) {
            request = this.roleService.update(this.model.id, Object.assign({}, this.model));
        } else {
            request = this.roleService.createNew(Object.assign({}, this.model));
        }

        request.subscribe(response => {
            this.toast.open('Role ' + (this.updating ? 'Updated' : 'Created'));
            this.close(response.data);
        }, this.handleErrors.bind(this));
    }

    /**
     * Reset all modal state to default.
     */
    private resetState() {
        this.model = new Role({'default': 0, permissions: {}});
        this.errors = {};
    }

    /**
     * Populate role model with given data.
     */
    private hydrateModel(role) {
        Object.assign(this.model, role);
    }

    /**
     * Format errors received from backend.
     */
    public handleErrors(response: {messages: object} = {messages: {}}) {
        this.errors = response.messages;
    }
}
