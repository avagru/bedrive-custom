import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnInit,
    ElementRef,
    ViewEncapsulation,
    Renderer2
} from '@angular/core';
import { Settings } from '../../config/settings.service';

@Component({
    selector: 'svg-icon',
    templateUrl: './svg-icon.component.html',
    styleUrls: ['./svg-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SvgIconComponent implements OnInit {
    /**
     * Name of the icon.
     */
    @Input() name: string;

    /**
     * Path of svg icon for svg 'use' tag
     */
    public path: string;

    /**
     * SvgIconComponent Constructor.
     */
    constructor(private el: ElementRef, private renderer: Renderer2, private settings: Settings) {}

    ngOnInit() {
        //this.path = this.settings.getAssetUrl('icons/merged.svg') + '#' + this.name;

        // start 'icon-{icon-name}' class to svg-icon component
        // so it's possible to target specific icons via css
        this.renderer.addClass(this.el.nativeElement, ('icon-' + this.name).replace(/ /g, '-'));
    }
}
