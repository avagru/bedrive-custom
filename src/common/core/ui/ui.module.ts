import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { NoResultsMessageComponent } from './no-results-message/no-results-message.component';
import { CommonModule } from '@angular/common';
import { CustomMenuComponent } from './custom-menu/custom-menu.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { EnterKeybindDirective } from './enter-keybind.directive';
import {
    MatButtonModule, MatSnackBarModule, MatMenuModule, MatCheckboxModule, MatTooltipModule, MatIconModule, MatIconRegistry
} from '@angular/material';
import { ConfirmModalModule } from './confirm-modal/confirm-modal.module';
import { LoggedInUserWidgetComponent } from './logged-in-user-widget/logged-in-user-widget.component';
import { MaterialNavbar } from './material-navbar/material-navbar.component';
import { AdHostComponent } from './ad-host/ad-host.component';
import { FormattedDatePipe } from './formatted-date.pipe';
import { CustomScrollbarModule } from './custom-scrollbar/custom-scrollbar.module';
import { BreakpointsService } from './breakpoints.service';
import { ContextMenuDirective } from './context-menu/context-menu.directive';
import { TranslationsModule } from '../translations/translations.module';
import { FormattedFileSizePipe } from '../../uploads/formatted-file-size.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { Settings } from '../config/settings.service';
import {ContactComponent} from '../../contact/contact.component';
import {LoadingPageComponent} from './loading-indicator/loading-page/loading-page.component';
import { AuthClickDirective } from './auth-click.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,

        // internal
        CustomScrollbarModule,
        ConfirmModalModule,
        TranslationsModule,

        // material
        MatButtonModule,
        MatSnackBarModule,
        MatMenuModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatIconModule,
    ],
    declarations: [
        LoadingIndicatorComponent,
        LoadingPageComponent,
        NoResultsMessageComponent,
        CustomMenuComponent,
        EmptyRouteComponent,
        EnterKeybindDirective,
        LoggedInUserWidgetComponent,
        MaterialNavbar,
        AdHostComponent,
        ContactComponent,
        FormattedDatePipe,
        ContextMenuDirective,
        FormattedFileSizePipe,
        AuthClickDirective,
    ],
    exports: [
        LoadingIndicatorComponent,
        LoadingPageComponent,
        NoResultsMessageComponent,
        CustomMenuComponent,
        EmptyRouteComponent,
        EnterKeybindDirective,
        LoggedInUserWidgetComponent,
        MaterialNavbar,
        AdHostComponent,
        ContactComponent,
        FormattedDatePipe,
        ContextMenuDirective,
        FormattedFileSizePipe,
        AuthClickDirective,

        // angular
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        // internal
        ConfirmModalModule,
        CustomScrollbarModule,
        TranslationsModule,

        // material
        MatButtonModule,
        MatSnackBarModule,
        MatMenuModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatIconModule,
    ],
    providers: [BreakpointsService]
})
export class UiModule {
    constructor(
        private icons: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private config: Settings,
    ) {
        const url = this.config.getAssetUrl('icons/merged.svg');
        this.icons.addSvgIconSet(
            this.sanitizer.bypassSecurityTrustResourceUrl(url)
        );
    }
}
