import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { BaseFilePreview } from '../base-file-preview';

@Component({
    selector: 'default-preview',
    templateUrl: './default-preview.component.html',
    styleUrls: ['./default-preview.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultPreviewComponent extends BaseFilePreview {
}
