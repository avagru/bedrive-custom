import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'new-line-modal',
    templateUrl: './new-line-modal.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewLineModalComponent {
    public form = new FormGroup({
        key: new FormControl(),
        value: new FormControl(),
    });

    constructor(private dialogRef: MatDialogRef<NewLineModalComponent>) {}

    public confirm() {
        this.close(this.form.value);
    }

    public close(line?: {key: string, value: string}) {
        this.dialogRef.close(line);
    }
}
