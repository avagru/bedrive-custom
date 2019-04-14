import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Translations} from '../../translations/translations.service';
import { BackendErrorResponse } from '../../types/backend-error-response';
import {Injectable} from '@angular/core';

export interface HttpError {
    uri: string;
    messages: {[key: string]: string};
    type: 'http';
    status: number;
    originalError: Error;
}

interface OriginalErrorBody {
    status: 'error';
    messages: {[key: string]: string[]};
}

@Injectable({
    providedIn: 'root'
})
export abstract class HttpErrorHandler {
    protected constructor(
        protected i18n: Translations,
    ) {}

    /**
     * Handle http request error.
     */
    public handle(response: HttpErrorResponse, uri?: string): Observable<never> {
        const body = this.parseJson(response.error);

        const error = {
            uri,
            messages: body.messages,
            type: 'http',
            status: response.status,
            originalError: new Error(response.message)
        };

        if (response.status === 403 || response.status === 401) {
            this.handle403Error(body);
        }

        return throwError(error as HttpError);
    }

    /**
     * Redirect user to login page or show toast informing
     * user that he does not have required permissions.
     */
    protected abstract handle403Error(response: BackendErrorResponse);

    /**
     * Parse JSON without throwing errors.
     */
    protected parseJson(json: string|OriginalErrorBody): BackendErrorResponse {
        let original: OriginalErrorBody;

        if (typeof json !== 'string') {
            original = json;
        } else {
            try {
                original = JSON.parse(json);
            } catch (e) {
                original = this.getEmptyErrorBody() as any;
            }
        }

        const newBody = this.getEmptyErrorBody();
        if ( ! original || ! original.messages) return newBody;
        Object.keys(original.messages).forEach(key => {
            const message = original.messages[key];
            newBody.messages[key] =  Array.isArray(message) ? message[0] : message;
        });

        return newBody;
    }

    protected getEmptyErrorBody(): BackendErrorResponse {
        return {status: 'error', messages: {}};
    }
}
