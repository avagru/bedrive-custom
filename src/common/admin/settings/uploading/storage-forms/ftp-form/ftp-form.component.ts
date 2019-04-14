import { Component, ViewEncapsulation } from '@angular/core';
import { SettingsState } from '../../../settings-state.service';

@Component({
    selector: 'ftp-form',
    templateUrl: './ftp-form.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class FtpFormComponent {
    constructor(public state: SettingsState) {}
}
