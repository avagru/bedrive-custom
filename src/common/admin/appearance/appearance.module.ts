import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';
import {AppearanceComponent} from './appearance.component';
import {AppearancePanelComponent} from './appearance-panel/appearance-panel.component';
import {MenusAppearancePanelComponent} from './menus-appearance-panel/menus-appearance-panel.component';
import {AddMenuItemPanelComponent} from './menus/add-menu-item-panel/add-menu-item-panel.component';
import {AppearancePanelMetaComponent} from './appearance-panel-meta/appearance-panel-meta.component';
import {MenuItemsComponent} from './menus/menu-items/menu-items.component';
import {AppearanceRoutingModule} from './appearance-routing.module';
import {AppearanceListInputComponent} from './inputs/appearance-list-input/appearance-list-input.component';
import {AppearanceColorInputComponent} from './inputs/appearance-color-input/appearance-color-input.component';
import {AppearanceTextInputComponent} from './inputs/appearance-text-input/appearance-text-input.component';
import {AppearanceImageInputComponent} from './inputs/appearance-image-input/appearance-image-input.component';
import {AppearanceCodeInputComponent} from './inputs/appearance-code-input/appearance-code-input.component';
import {MatAutocompleteModule, MatExpansionModule, MatSnackBarModule} from '@angular/material';
import {UiModule} from '../../core/ui/ui.module';
import {CodeEditorModalComponent} from './code-editor-modal/code-editor-modal.component';
import {ColorpickerPanelComponent} from '../../core/ui/color-picker/colorpicker-panel.component';
import { OverlayPanel } from '../../core/ui/overlay-panel/overlay-panel.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {HomepageAppearancePanelComponent} from './homepage-appearance-panel/homepage-appearance-panel.component';
import { IconSelectorComponent } from './menus/icon-selector/icon-selector.component';

@NgModule({
    imports:      [
        ColorPickerModule,
        AppearanceRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        ColorPickerModule,

        // material
        MatExpansionModule,
        MatSnackBarModule,

        // temp
        MatAutocompleteModule,
        DragDropModule,
    ],
    declarations: [
        AppearanceComponent,
        AppearancePanelComponent,
        MenusAppearancePanelComponent,
        AddMenuItemPanelComponent,
        AppearancePanelMetaComponent,
        MenuItemsComponent,
        CodeEditorModalComponent,
        AppearanceListInputComponent,
        AppearanceColorInputComponent,
        AppearanceTextInputComponent,
        AppearanceImageInputComponent,
        AppearanceCodeInputComponent,
        IconSelectorComponent,

        // TODO: fix this later (move to mtdb app)
        HomepageAppearancePanelComponent,
    ],
    entryComponents: [
        CodeEditorModalComponent,
        ColorpickerPanelComponent,
        IconSelectorComponent,
    ],
    providers: [
        OverlayPanel,
    ]
})
export class AppearanceModule { }
