import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material';

export class BaseDialog implements OnDestroy {
    public loading = new BehaviorSubject(false);
    protected subs: Subscription[] = [];
    protected dialogRef: MatDialogRef<BaseDialog>;

    ngOnDestroy() {
        this.subs.forEach(sub => sub && sub.unsubscribe());
    }

    public close() {
        this.dialogRef.close();
    }

    protected addSubs(...sub: Subscription[]) {
        this.subs.push(...sub);
    }
}
