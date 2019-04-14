import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MatButtonModule, MatDialogModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { UploadButtonDirective } from './directives/upload-button.directive';
import { UploadDropzoneDirective } from './directives/upload-dropzone.directive';
import {UploadProgressBarComponent} from './upload-progress-bar/upload-progress-bar.component';

@NgModule({
    imports: [
        CommonModule,

        // material
        MatDialogModule,
        MatButtonModule,
        MatProgressBarModule,
        MatIconModule,
    ],
    declarations: [
        UploadDropzoneDirective,
        UploadButtonDirective,
        UploadProgressBarComponent,
    ],
    exports: [
        UploadDropzoneDirective,
        UploadButtonDirective,
        UploadProgressBarComponent,
    ],
})
export class UploadsModule {
}
