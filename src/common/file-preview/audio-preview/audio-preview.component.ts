import { Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, OnInit } from '@angular/core';
import { BaseFilePreview } from '../base-file-preview';

@Component({
    selector: 'audio-preview',
    templateUrl: './audio-preview.component.html',
    styleUrls: ['./audio-preview.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioPreviewComponent extends BaseFilePreview implements OnInit {
    @ViewChild('playerEl') playerEl: ElementRef;
    public invalidMedia = false;

    ngOnInit() {
        this.invalidMedia = !this.canPlayVideo();

        if ( ! this.invalidMedia) {
            this.player().src = this.getSrc();
            this.player().play();
        }
    }

    protected canPlayVideo(): boolean {
        return !!this.player().canPlayType(this.file.mime);
    }

    protected player() {
        return this.playerEl.nativeElement as HTMLVideoElement|HTMLAudioElement;
    }
}
