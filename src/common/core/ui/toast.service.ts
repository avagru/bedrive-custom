import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Settings } from '../config/settings.service';
import { Translations } from '../translations/translations.service';
import { MatSnackBarRef } from '@angular/material/snack-bar/typings/snack-bar-ref';
import { SimpleSnackBar } from '@angular/material/snack-bar/typings/simple-snack-bar';
import { ComponentType } from '@angular/cdk/portal';
import { HttpErrors } from '../http/errors/http-errors.enum';

export interface ToastMessage {
    message: string;
    replacements: {[key: string]: string|number};
}

export interface ToastConfig {
    duration?: number;
    action?: string;
}

@Injectable({
    providedIn: 'root'
})
export class Toast {
    constructor(
        private settings: Settings,
        private i18n: Translations,
        private snackbar: MatSnackBar
    ) {}

    public open(message: string|ToastMessage, config: ToastConfig = {}): MatSnackBarRef<SimpleSnackBar> {
        if ( ! config.duration && config.duration !== 0) {
            config.duration = this.settings.get('toast.default_timeout', 3000);
        }

        if ( ! message) {
            message = HttpErrors.Default;
        }

        const translatedMsg = typeof message === 'string' ?
            this.i18n.t(message) :
            this.i18n.t(message.message, message.replacements);

        return this.snackbar.open(this.i18n.t(translatedMsg), this.i18n.t(config.action), {duration: config.duration});
    }

    public openComponent<T>(component: ComponentType<T>, config?: {duration?: number, data?: {[key: string]: any}}) {
        return this.snackbar.openFromComponent(component, config);
    }
}
