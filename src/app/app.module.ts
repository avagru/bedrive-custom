import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'common/core/core.module';
import { AuthModule } from 'common/auth/auth.module';
import { RouterModule } from '@angular/router';
import { APP_CONFIG } from 'common/core/config/vebto-config';
import { BEDRIVE_CONFIG } from './bedrive-config';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { AppRoutingModule } from './app-routing.module';
import { AccountSettingsModule } from 'common/account-settings/account-settings.module';
import { HomepageComponent } from './homepage/homepage.component';
import { PagesModule } from '../common/core/pages/pages.module';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        // ServiceWorkerModule.register('client/ngsw-worker.js', {enabled: environment.production}),
        CoreModule.forRoot(),
        AuthModule,
        AccountSettingsModule,
        AppRoutingModule,
        PagesModule,

        NgxsModule.forRoot([], {developmentMode: !environment.production}),
        NgxsRouterPluginModule.forRoot(),
        // NgxsReduxDevtoolsPluginModule.forRoot()
    ],
    providers: [
        {
            provide: APP_CONFIG,
            useValue: BEDRIVE_CONFIG,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
