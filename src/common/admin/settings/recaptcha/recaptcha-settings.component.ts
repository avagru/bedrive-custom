import {Component, ViewEncapsulation} from '@angular/core';
import {SettingsPanelComponent} from '../settings-panel.component';

@Component({
    selector: 'recaptcha-settings',
    templateUrl: './recaptcha-settings.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class RecaptchaSettingsComponent extends SettingsPanelComponent {
}
