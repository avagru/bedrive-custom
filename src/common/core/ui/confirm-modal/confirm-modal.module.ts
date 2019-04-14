import {NgModule} from '@angular/core';
import {ConfirmModalComponent} from './confirm-modal.component';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import {Modal} from '../dialogs/modal.service';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
    ],
    declarations: [
        ConfirmModalComponent
    ],
    entryComponents: [
        ConfirmModalComponent
    ],
    exports: [
        ConfirmModalComponent,
    ],
    providers: [
        Modal,
    ]
})
export class ConfirmModalModule {
}
