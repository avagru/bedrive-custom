import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceInputComponent } from './space-input.component';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [
        SpaceInputComponent
    ],
    exports: [
        SpaceInputComponent,
    ]
})
export class SpaceInputModule {
}
