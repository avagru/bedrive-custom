import { Injectable, NgZone } from '@angular/core';
import {Router} from '@angular/router';
import {Toast} from '../../ui/toast.service';
import {Translations} from '../../translations/translations.service';
import {HttpErrorHandler} from './http-error-handler.service';
import { BackendErrorResponse } from '../../types/backend-error-response';
import { CurrentUser } from '../../../auth/current-user';

@Injectable({
    providedIn: 'root'
})
export class BackendHttpErrorHandler extends HttpErrorHandler {
    constructor(
        protected i18n: Translations,
        protected currentUser: CurrentUser,
        protected router: Router,
        protected toast: Toast,
        protected zone: NgZone,
    ) {
        super(i18n);
    }

    /**
     * Redirect user to login page or show toast informing
     * user that he does not have required permissions.
     */
    protected handle403Error(response: BackendErrorResponse) {
        // if user doesn't have access, navigate to login page
        if (this.currentUser.isLoggedIn()) {
            this.showToast(response);
        } else {
            this.router.navigate(['/login']);
        }
    }

    protected showToast(response: BackendErrorResponse) {
        this.zone.run(() => {
            const msg = 'You don\'t have required permissions to do that.';
            this.toast.open(response.messages.general ? response.messages.general : msg);
        });
    }
}
