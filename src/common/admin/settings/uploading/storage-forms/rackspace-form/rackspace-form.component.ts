import { Component, ViewEncapsulation } from '@angular/core';
import { SettingsState } from '../../../settings-state.service';

@Component({
    selector: 'rackspace-form',
    templateUrl: './rackspace-form.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class RackspaceFormComponent {
    constructor(public state: SettingsState) {}
}
