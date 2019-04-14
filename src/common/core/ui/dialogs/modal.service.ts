import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialogConfig } from '@angular/material/dialog/typings/dialog-config';

@Injectable({
    providedIn: 'root',
})
export class Modal {
    constructor(private dialog: MatDialog) {}

    public open<T>(component: ComponentType<T>, data: object = {}, config: string|MatDialogConfig = {}): MatDialogRef<T> {
        if ( ! data) data = {};

        if (typeof config === 'string') config = {panelClass: config};
        if ( ! Array.isArray(config.panelClass)) config.panelClass = [config.panelClass];
        config.panelClass.push('be-modal');

        return this.dialog.open(component, {...config, data});
    }

    public show<T>(component: ComponentType<T>, data: object = {}): MatDialogRef<T> {
        return this.open(component, data);
    }

    public anyDialogOpen(): boolean {
        return this.dialog.openDialogs.length > 0;
    }
}
