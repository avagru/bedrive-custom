import {Component, ViewEncapsulation} from '@angular/core';
import { Settings } from '../../config/settings.service';

@Component({
    selector: 'not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class NotFoundPageComponent  {
    constructor(public config: Settings) {}
}
