import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AppAdminRoutingModule} from './app-admin-routing.module';
import { BaseAdminModule } from '../../common/admin/base-admin.module';
import { ChipInputModule } from '../../common/core/ui/chip-input/chip-input.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppAdminRoutingModule,
        BaseAdminModule,

        ChipInputModule,
    ],
    declarations: [
    ],
    entryComponents: [

    ]
})
export class AppAdminModule {
}
