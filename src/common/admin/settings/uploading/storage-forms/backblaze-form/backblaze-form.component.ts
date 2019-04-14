import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { SettingsState } from '../../../settings-state.service';

@Component({
    selector: 'backblaze-form',
    templateUrl: './backblaze-form.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackblazeFormComponent {
    constructor(public state: SettingsState) {}
}
