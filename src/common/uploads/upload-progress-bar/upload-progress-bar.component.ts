import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnDestroy, ViewEncapsulation} from '@angular/core';
import {UploadQueueService} from '../upload-queue/upload-queue.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'upload-progress-bar',
    templateUrl: './upload-progress-bar.component.html',
    styleUrls: ['./upload-progress-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class UploadProgressBarComponent implements OnDestroy {
    @HostBinding('class.hidden') initiallyHidden = true;

    private subscription: Subscription;

    constructor(
        private el: ElementRef,
        public uploadQueue: UploadQueueService
    ) {
        this.subscription = this.uploadQueue.totalProgress()
            .subscribe(progress => {
                if (progress < 1 || progress === 100) {
                    this.el.nativeElement.classList.add('hidden');
                } else {
                    this.el.nativeElement.classList.remove('hidden');
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

