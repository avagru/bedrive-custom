import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AppearanceEditableField} from '../../../../core/config/vebto-config';
import {Settings} from '../../../../core/config/settings.service';
import {Toast} from '../../../../core/ui/toast.service';
import { AppearanceEditor } from '../../appearance-editor/appearance-editor.service';
import { Modal } from '../../../../core/ui/dialogs/modal.service';
import { CodeEditorModalComponent } from '../../code-editor-modal/code-editor-modal.component';
import { SetCustomCss, SetCustomJs } from '../../../../shared/appearance/commands/appearance-commands';

@Component({
    selector: 'appearance-code-input',
    templateUrl: './appearance-code-input.component.html',
    styleUrls: ['./appearance-code-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppearanceCodeInputComponent implements OnInit {
    @Input() field: AppearanceEditableField;

    constructor(
        private editor: AppearanceEditor,
        private modal: Modal,
        private settings: Settings,
        private toast: Toast,
    ) {}

    ngOnInit() {
        this.addCodeToPreview(
            this.field.config.language,
        );
    }

    /**
     * Open code editor modal and commit resulting changes.
     */
    public openModal(field: AppearanceEditableField) {
        const params = {contents: this.getValue(), language: field.config.language},
            className = 'code-editor-modal-container';

        this.modal.open(CodeEditorModalComponent, params, className)
            .afterClosed().subscribe(value => {
                if (this.getValue() === value) return;

                this.saveChanges(field, value).subscribe(() => {
                    this.addCodeToPreview(field.config.language);
                    this.toast.open('Custom code saved');
                });
            });
    }

    /**
     * Add custom css/js to preview iframe
     */
    private addCodeToPreview(type: 'css'|'js') {
        if (type === 'css') {
            this.editor.postMessage(new SetCustomCss());
        } else {
            this.editor.postMessage(new SetCustomJs());
        }
    }

    private getValue() {
        // TODO: see why field.defaultValue needs to be used.
        return this.field.value || this.field.defaultValue;
    }

    /**
     * Commit code field changes.
     */
    private saveChanges(field: AppearanceEditableField, newValue: string) {
        field.value = newValue;
        const changes = {};
        changes[field.key] = newValue;
        return this.editor.changes.saveChanges(changes);
    }
}
