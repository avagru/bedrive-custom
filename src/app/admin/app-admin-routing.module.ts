import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from 'common/guards/auth-guard.service';
import {CheckPermissionsGuard} from 'common/guards/check-permissions-guard.service';
import {AdminComponent} from 'common/admin/admin.component';
import {SettingsComponent} from 'common/admin/settings/settings.component';
import {SettingsResolve} from 'common/admin/settings/settings-resolve.service';
import {vebtoSettingsRoutes} from 'common/admin/settings/settings-routing.module';
import { vebtoAdminRoutes } from '../../common/admin/base-admin-routing.module';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard, CheckPermissionsGuard],
        canActivateChild: [AuthGuard, CheckPermissionsGuard],
        data: {permissions: ['admin.access']},
        children: [
            {
                path: 'settings',
                component: SettingsComponent,
                resolve: {settings: SettingsResolve},
                data: {permissions: ['settings.view']},
                children: [
                    ...vebtoSettingsRoutes,
                ],
            },
            ...vebtoAdminRoutes,
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppAdminRoutingModule {
}
