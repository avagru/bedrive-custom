import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {SettingsPanelComponent} from '../settings-panel.component';

@Component({
    selector: 'uploading-settings',
    templateUrl: './uploading-settings.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class UploadingSettingsComponent extends SettingsPanelComponent implements OnInit {
    public allowedExtensions: string[] = [];
    public blockedExtensions: string[] = [];
    public serverMaxUploadSize: string;

    ngOnInit() {
        this.allowedExtensions = this.settings.getJson('uploads.allowed_extensions', []);
        this.blockedExtensions = this.settings.getJson('uploads.blocked_extensions', []);
        this.getServerMaxUploadSize();
    }

    public saveSettings() {
        this.setJson('uploads.allowed_extensions', this.allowedExtensions);
        this.setJson('uploads.blocked_extensions', this.blockedExtensions);
        super.saveSettings();
    }

    private getServerMaxUploadSize() {
        this.http.get('uploads/server-max-file-size').subscribe(response => {
            this.serverMaxUploadSize = response.maxSize;
        });
    }
}
