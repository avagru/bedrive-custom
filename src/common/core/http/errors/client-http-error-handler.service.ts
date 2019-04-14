import {Injectable} from '@angular/core';
import {Toast} from '../../ui/toast.service';
import {Translations} from '../../translations/translations.service';
import {HttpErrorHandler} from './http-error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class ClientHttpErrorHandler extends HttpErrorHandler {

    /**
     * HttpErrorHandler Constructor.
     */
    constructor(protected i18n: Translations, protected toast: Toast) {
        super(i18n);
    }

    /**
     *  403 errors won't happen in client only apps,
     *  so we can stub this method.
     */
    protected handle403Error(response: object) {}
}
