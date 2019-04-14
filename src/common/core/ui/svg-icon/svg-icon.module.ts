import {NgModule} from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Settings } from '../../config/settings.service';
import { SvgIconComponent } from './svg-icon.component';

@NgModule({
    imports: [
        MatIconModule,
    ],
    declarations: [
        SvgIconComponent,
    ],
    exports: [
        MatIconModule,
        SvgIconComponent,
    ]
})
export class SvgIconModule {
    constructor(
        private icons: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private config: Settings
    ) {
        const url = this.config.getAssetUrl('icons/merged.svg');
        this.icons.addSvgIconSet(
            this.sanitizer.bypassSecurityTrustResourceUrl(url)
        );
    }
}
