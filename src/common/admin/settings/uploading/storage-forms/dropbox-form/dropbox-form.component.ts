import { Component, ViewEncapsulation } from '@angular/core';
import { SettingsState } from '../../../settings-state.service';

@Component({
    selector: 'dropbox-form',
    templateUrl: './dropbox-form.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class DropboxFormComponent {
    constructor(public state: SettingsState) {}
}
