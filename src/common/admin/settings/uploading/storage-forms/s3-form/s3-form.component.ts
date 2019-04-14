import { Component, ViewEncapsulation } from '@angular/core';
import { SettingsState } from '../../../settings-state.service';

@Component({
    selector: 's3-form',
    templateUrl: './s3-form.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class S3FormComponent {
    constructor(public state: SettingsState) {}
}
