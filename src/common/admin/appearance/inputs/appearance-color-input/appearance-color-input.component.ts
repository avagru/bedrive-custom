import {Component, Input, OnInit, ViewEncapsulation, ElementRef} from '@angular/core';
import {AppearanceEditor} from '../../appearance-editor/appearance-editor.service';
import {ColorpickerPanelComponent} from '../../../../core/ui/color-picker/colorpicker-panel.component';
import {AppearanceEditableField} from '../../../../core/config/vebto-config';
import {OverlayPanel} from '../../../../core/ui/overlay-panel/overlay-panel.service';
import { SetColors } from '../../../../shared/appearance/commands/appearance-commands';
import { BOTTOM_POSITION } from '../../../../core/ui/overlay-panel/positions/bottom-position';
import {flattenArray} from '../../../../core/utils/flatten-array';

@Component({
    selector: 'appearance-color-input',
    templateUrl: './appearance-color-input.component.html',
    styleUrls: ['./appearance-color-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppearanceColorInputComponent implements OnInit {

    /**
     * Editable field this input is attached to.
     */
    @Input() field: AppearanceEditableField;

    /**
     * Template of editable theme for the application.
     */
    private editableTheme: string;

    /**
     * All editable fields of type color.
     */
    private allColorFields: AppearanceEditableField[] = [];

    /**
     * AppearanceColorInput Constructor.
     */
    constructor(
        private editor: AppearanceEditor,
        private overlayPanel: OverlayPanel,
    ) {}

    ngOnInit() {
        if ( ! this.field.value) this.field.value = this.field.defaultValue;
        this.allColorFields = this.getAllColorFields();
        this.editableTheme = this.editor.getDefaultSetting('editable_theme');
        this.compileTheme(false);
    }

    /**
     * Open color picker and subscribe to color changes.
     */
    public openColorPicker(e: MouseEvent, currentColor: string) {
        this.overlayPanel.open(
            ColorpickerPanelComponent,
            {origin: new ElementRef(e.target), position: BOTTOM_POSITION, data: {color: currentColor}}
        ).valueChanged().subscribe(color => {
            this.field.value = color;
            this.compileTheme();
        });
    }

    /**
     * Compile a CSS theme using user selected values.
     */
    public compileTheme(shouldCommit = true) {
        // copy the theme so we don't edit original
        let theme = this.editableTheme;

        // replace color placeholders in theme with actual values
        this.allColorFields.forEach(field => {
            theme = theme.replace(new RegExp(field.key, 'g'), field.value);
        });

        // apply generated theme to preview
        this.editor.postMessage(new SetColors(theme));

        // commit changes if needed
        if (shouldCommit) {
            this.commitChanges(theme);
        }

        return theme;
    }

    /**
     * Get color changes that need to be persisted to backend.
     */
    public commitChanges(theme: string) {
        // get current color values
        const values = this.allColorFields.map(field => {
            return {name: field.key, value: field.value};
        });

        this.editor.changes.add('colors', {themeValues: values, theme});
    }

    /**
     * Get all editable fields of color type.
     */
    private getAllColorFields(): AppearanceEditableField[] {
        return flattenArray(Object.keys(this.editor.config.sections).map(key => {
            return this.editor.config.sections[key].fields.filter(field => field.type === 'color');
        }));
    }
}
