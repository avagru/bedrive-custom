import { Component, Input, ViewEncapsulation, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'loading-page',
    styleUrls: ['./loading-page.component.scss'],
    templateUrl: './loading-page.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingPageComponent {
}
