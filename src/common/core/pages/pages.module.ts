import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from '@angular/common';
import {CustomPageComponent} from './custom-page/custom-page.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {CustomHomepage} from './custom-homepage.service';
import {Pages} from './pages.service';
import {UiModule} from '../ui/ui.module';
import { NOT_FOUND_ROUTES } from '../wildcard-routing.module';

const routes: Routes = [
    {
        path: 'pages/:id/:slug',
        component: CustomPageComponent,
        data: {permissions: ['pages.view']}
    },
    ...NOT_FOUND_ROUTES,
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        UiModule,
        PagesRoutingModule,
    ],
    declarations: [
        CustomPageComponent,
        NotFoundPageComponent,
    ],
    exports: [
        ],
    providers: [
        CustomHomepage,
        Pages,
    ],
    entryComponents: [
        CustomPageComponent,
    ]
})
export class PagesModule {
}

