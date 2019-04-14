import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AppearanceEditor} from '../../appearance-editor/appearance-editor.service';
import {AppearanceEditableField} from '../../../../core/config/vebto-config';
import { openUploadWindow } from '../../../../uploads/utils/open-upload-window';
import { UploadQueueService } from '../../../../uploads/upload-queue/upload-queue.service';
import { AppearanceImageUploadValidator } from './appearance-image-upload-validator';
import { UploadInputTypes } from '../../../../uploads/upload-input-config';
import { Settings } from '../../../../core/config/settings.service';

@Component({
    selector: 'appearance-image-input',
    templateUrl: './appearance-image-input.component.html',
    styleUrls: ['./appearance-image-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppearanceImageInputComponent {

    /**
     * Editable field this input is attached to.
     */
    @Input() field: AppearanceEditableField;

    /**
     * AppearanceImageInputComponent Constructor.
     */
    constructor(
        private editor: AppearanceEditor,
        private uploadQueue: UploadQueueService,
        private validator: AppearanceImageUploadValidator,
        public settings: Settings,
    ) {
        this.validator.showToast = true;
    }

    /**
     * Open modal for changing specified editable field image.
     */
    public openModal(field: AppearanceEditableField) {
        const params = {
            uri: 'uploads/images',
            httpParams: {type: 'branding'},
            validator: this.validator,
        };

        openUploadWindow({types: [UploadInputTypes.image]}).then(files => {
            this.uploadQueue.start(files, params).subscribe(entry => {
                this.updateValue(entry.url);

                // re-position highlight element box after uploading image,
                // use timeout to wait until new image is loaded properly
                setTimeout(() => {
                    this.editor.selectNode(field.selector);
                }, 100);
            });
        });
    }

    /**
     * Remove current editable field image.
     */
    public remove() {
        this.updateValue(null);
    }

    /**
     * Use default value for image field.
     */
    public useDefault() {
        this.updateValue(this.field.defaultValue);
    }

    /**
     * Update current image field value.
     */
    private updateValue(value: string) {
        this.commitChanges(this.field, value);
        this.editor.setConfig(this.field.key, value);
    }

    /**
     * Commit image changes.
     */
    private commitChanges(field: AppearanceEditableField, newValue: any) {
        field.value = newValue;
        this.editor.changes.add(field.key, newValue);
    }
}
