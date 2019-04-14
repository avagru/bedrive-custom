import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AuthGuard } from 'common/guards/auth-guard.service';
import { HomepageComponent } from './homepage/homepage.component';
import { GuestGuard } from '../common/guards/guest-guard.service';
import { ContactComponent } from '../common/contact/contact.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomepageComponent, canActivate: [GuestGuard]},
    {path: 'admin', loadChildren: 'app/admin/app-admin.module#AppAdminModule', canLoad: [AuthGuard]},
    {path: 'drive', loadChildren: 'app/drive/drive.module#DriveModule'},
    {path: 'billing', loadChildren: 'common/billing/billing.module#BillingModule', canLoad: [AuthGuard]},
    {path: 'contact', component: ContactComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
