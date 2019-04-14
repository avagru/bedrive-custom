import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppHttpClient} from '../../../../core/http/app-http-client.service';
import {BehaviorSubject} from 'rxjs';
import {OverlayPanelRef} from '../../../../core/ui/overlay-panel/overlay-panel-ref';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'icon-selector',
    templateUrl: './icon-selector.component.html',
    styleUrls: ['./icon-selector.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconSelectorComponent implements OnInit {
    public icons$: BehaviorSubject<string[]> = new BehaviorSubject([]);
    public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private http: AppHttpClient,
        private overlayPanelRef: OverlayPanelRef,
    ) {}

    ngOnInit() {
        this.loading$.next(true);
        this.http.get('admin/icons')
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                this.icons$.next(response.icons);
            });
    }

    public selectIcon(icon: string) {
        this.overlayPanelRef.emitValue(icon);
        this.overlayPanelRef.close();
    }
}
