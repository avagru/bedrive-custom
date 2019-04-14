import {Component, Inject, ViewEncapsulation, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../../core/types/models/User';
import {Users} from '../../../auth/users.service';
import {Toast} from '../../../core/ui/toast.service';
import { finalize } from 'rxjs/operators';

export interface CrupdateUserModalData {
    user?: User;
}

@Component({
    selector: 'crupdate-user-modal',
    templateUrl: './crupdate-user-modal.component.html',
    styleUrls: ['./crupdate-user-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CrupdateUserModalComponent implements OnInit {
    public model: User;
    public errors: any = {};
    public loading: boolean;

    /**
     * If we are updating existing user or creating a new one.
     */
    public updating = false;

    /**
     * CrupdateUserModalComponent Constructor.
     */
    constructor(
        private dialogRef: MatDialogRef<CrupdateUserModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdateUserModalData,
        public users: Users,
        private toast: Toast
    ) {
        this.resetState();
    }

    ngOnInit() {
        this.resetState();

        if (this.data.user) {
            this.updating = true;
            this.hydrateModel(this.data.user);
        } else {
            this.updating = false;
        }
    }

    /**
     * Create a new user or update existing one.
     */
    public confirm() {
        if (this.loading) return;
        let request, payload = this.getPayload();

        this.loading = true;

        if (this.updating) {
            request = this.users.update(payload.id, payload);
        } else {
            request = this.users.create(payload);
        }

        request.pipe(finalize(() => this.loading = false))
            .subscribe(response => {
                this.close(response.user);
                const action = this.updating ? 'updated' : 'created';
                this.toast.open('User has been ' + action);
            }, response => {
                this.handleErrors(response);
            });
    }

    /**
     * Close the modal.
     */
    public close(data?: any) {
        this.resetState();
        this.dialogRef.close(data);
    }

    /**
     * Get payload for updating or creating a user.
     */
    private getPayload() {
        const payload = Object.assign({}, this.model) as any;
        payload.roles = payload.roles.map(role => role.id);
        return payload;
    }

    /**
     * Reset all modal state to default.
     */
    private resetState() {
        this.model = new User({roles: []});
        this.errors = {};
    }

    /**
     * Populate user model with given data.
     */
    private hydrateModel(user) {
        Object.assign(this.model, user);
    }

    /**
     * Format errors received from backend.
     */
    public handleErrors(response: {messages: object} = {messages: {}}) {
        this.errors = response.messages || {};
    }
}
