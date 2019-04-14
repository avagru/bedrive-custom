import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { DriveEntry } from '../../models/drive-entry';
import { DriveUrlsService } from '../../../drive-urls.service';
import { Settings } from 'common/core/config/settings.service';

@Component({
    selector: 'file-thumbnail',
    templateUrl: './file-thumbnail.component.html',
    styleUrls: ['./file-thumbnail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileThumbnailComponent {
    @Input() file: DriveEntry;

    constructor(
        private urls: DriveUrlsService,
        private settings: Settings
    ) {}

    public getPreviewUrl(): string {
        let url = this.settings.getBaseUrl(true) + this.file.url;
        if (this.file.thumbnail) url += '?thumbnail=true';
        return url;
    }

    public getFolderIcon() {
        if (this.file.users && this.file.users.length > 1) {
            return 'shared-folder';
        } else {
            return 'folder';
        }
    }
}
