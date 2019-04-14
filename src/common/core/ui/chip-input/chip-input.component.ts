import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, AfterViewInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { ControlValueAccessor, FormArray, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'chip-input',
    templateUrl: './chip-input.component.html',
    styleUrls: ['./chip-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: ChipInputComponent,
        multi: true,
    }]
})
export class ChipInputComponent implements AfterViewInit, ControlValueAccessor {
    @Input() placeholder: string;
    @Input() email: ''|undefined;
    @Input() required: ''|undefined;

    public propagateChange: Function;
    public formArray = new FormArray([], this.getArrayValidations());

    ngAfterViewInit() {
        this.bindToFormChange();
    }

    public remove(index: number) {
        this.formArray.removeAt(index);
    }

    public add(e: MatChipInputEvent) {
        const value = e.value.trim(),
            duplicate = this.formArray.getRawValue().indexOf(value) > -1;

        // clear input
        e.input.value = '';

        if (value && ! duplicate) {
            this.addChip(value);
        }
    }

    private addChip(value: string) {
        this.formArray.push(new FormControl(value, this.getItemValidations()));
    }

    private getItemValidations() {
        const validations = [];

        if (this.email != null) {
            validations.push(Validators.email);
        }

        return validations;
    }

    private getArrayValidations() {
        const validations = [];

        if (this.required != null) {
            validations.push(Validators.required);
        }

        return validations;
    }

    private bindToFormChange() {
        this.formArray.valueChanges
            .pipe(filter(() => this.formArray.valid))
            .subscribe(value => {
                this.propagateChange(value);
            });
    }

    public writeValue(value: string[] = []) {
        if (value && value.length) {
            value.forEach(item => this.addChip(item));
        } else if (this.formArray.length) {
            while (this.formArray.length !== 0) {
                this.formArray.removeAt(0);
            }
        }
    }

    public registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}
}
