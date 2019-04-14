import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Settings} from '../../core/config/settings.service';
import {Toast} from '../../core/ui/toast.service';
import {finalize} from 'rxjs/operators';
import { HttpErrors } from '../../core/http/errors/http-errors.enum';

@Component({
    selector: 'ads-page',
    templateUrl: './ads-page.component.html',
    styleUrls: ['./ads-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdsPageComponent implements OnInit {
    public model = {};
    public loading = false;

    constructor(
        public settings: Settings,
        private toast: Toast,
    ) {}

    ngOnInit() {
        this.hydrate();
    }

    public saveAds() {
        this.loading = true;
        this.settings.save({client: this.model})
            .pipe(finalize(() => this.loading = false))
            .subscribe(() => {
                this.toast.open('Ads have been updated.');
            }, () => {
                this.toast.open(HttpErrors.Default);
            });
    }

    private hydrate() {
        const ads = this.settings.get('ads') || {};

        Object.keys(ads).forEach(key => {
            this.model['ads.' + key] = ads[key];
        });
    }
}
