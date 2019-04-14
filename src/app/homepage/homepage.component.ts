import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Settings } from 'common/core/config/settings.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent implements OnInit, OnDestroy {
    private sub: Subscription;

    constructor(
        public settings: Settings,
        private changeDetection: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.sub = this.settings.onChange.subscribe(() => {
            this.changeDetection.detectChanges();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public backgroundStyle() {
        const base = 'url(',
            end = ')',
            url = this.settings.get('landingPage.background');

        return base + this.settings.getBaseUrl(true) + url + end;
    }
}
