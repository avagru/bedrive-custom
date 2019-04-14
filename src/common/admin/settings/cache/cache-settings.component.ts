import {Component, ViewEncapsulation} from '@angular/core';
import {SettingsPanelComponent} from '../settings-panel.component';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'cache-settings',
    templateUrl: './cache-settings.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CacheSettingsComponent extends SettingsPanelComponent {
    public clearCache() {
        this.loading = true;
        this.artisan.call({command: 'cache:clear'})
            .pipe(finalize(() => this.loading = false))
            .subscribe(() => {
                this.toast.open('Cache cleared.');
            });
    }
}
