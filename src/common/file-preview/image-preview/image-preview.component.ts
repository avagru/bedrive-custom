import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { BaseFilePreview } from '../base-file-preview';

@Component({
    selector: 'image-preview',
    templateUrl: './image-preview.component.html',
    styleUrls: ['./image-preview.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagePreviewComponent extends BaseFilePreview {}
