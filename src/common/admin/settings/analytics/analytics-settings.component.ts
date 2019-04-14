import {Component, ViewEncapsulation} from '@angular/core';
import {SettingsPanelComponent} from '../settings-panel.component';
import {SettingsPayload} from '../../../core/config/settings-payload';

@Component({
    selector: 'analytics-settings',
    templateUrl: './analytics-settings.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AnalyticsSettingsComponent extends SettingsPanelComponent {
    public certificateFile: File;

    public saveSettings(settings?: SettingsPayload) {
        const payload = this.getPayload(settings || this.state.getModified());
        super.saveSettings(payload);
    }

    private getPayload(settings: SettingsPayload) {
        if (this.certificateFile) {
            settings.files = {certificate: this.certificateFile};
        }
        return settings;
    }

    public setCertificateFile(files: FileList) {
        this.certificateFile = files.item(0);
    }
}
