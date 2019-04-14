import { Component, ViewEncapsulation } from '@angular/core';
import { SettingsState } from '../../../settings-state.service';

@Component({
    selector: 'digitalocean-form',
    templateUrl: './digitalocean-form.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class DigitaloceanFormComponent {
    constructor(public state: SettingsState) {}
}
