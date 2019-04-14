import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { SUPPORTED_ENTRY_TYPES } from '../../../entries/supported-entry-types';
import { kebabCase } from '../../../../../common/core/utils/kebab-case';

@Component({
    selector: 'file-icon',
    templateUrl: './file-icon.component.html',
    styleUrls: ['./file-icon.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileIconComponent implements OnChanges {
    @Input() type: string;

    ngOnChanges() {
        if (SUPPORTED_ENTRY_TYPES.indexOf(this.type) === -1) {
            this.type = 'default';
        }
    }

    public getType() {
        return kebabCase(this.type);
    }
}
