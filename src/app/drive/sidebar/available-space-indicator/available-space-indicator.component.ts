import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';
import { DriveState } from '../../state/drive-state';
import { Observable } from 'rxjs';
import { Settings } from '../../../../common/core/config/settings.service';

@Component({
    selector: 'available-space-indicator',
    templateUrl: './available-space-indicator.component.html',
    styleUrls: ['./available-space-indicator.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvailableSpaceIndicatorComponent {
    @Select(DriveState.userSpaceUsed) spaceUsed$: Observable<number>;
    @Select(DriveState.userSpaceAvailable) spaceAvailable$: Observable<number>;
    @Select(DriveState.spaceUsedPercent) spaceUsedPercent$: Observable<number>;

    constructor(public settings: Settings) {}

    public billingEnabled() {
        return this.settings.get('billing.enable');
    }
}
