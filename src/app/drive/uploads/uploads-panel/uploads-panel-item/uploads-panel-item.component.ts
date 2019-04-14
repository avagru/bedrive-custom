import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { UploadQueueItem } from 'common/uploads/upload-queue/upload-queue-item';

@Component({
    selector: 'uploads-panel-item',
    templateUrl: './uploads-panel-item.component.html',
    styleUrls: ['./uploads-panel-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadsPanelItemComponent {
    @Input() upload: UploadQueueItem;
}
