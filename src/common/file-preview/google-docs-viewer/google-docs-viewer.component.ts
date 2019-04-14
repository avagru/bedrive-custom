import { Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BaseFilePreview } from '../base-file-preview';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'google-docs-viewer',
    templateUrl: './google-docs-viewer.component.html',
    styleUrls: ['./google-docs-viewer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleDocsViewerComponent extends BaseFilePreview implements AfterViewInit {
    @ViewChild('iframe') iframe: ElementRef<HTMLIFrameElement>;
    public loading$ = new BehaviorSubject(true);
    public showDefaultPreview$ = new BehaviorSubject(false);
    private timeoutRef: number;

    ngAfterViewInit() {
        // google docs viewer only supports file up to 25MB
        if (this.file.file_size > 25000000) {
            return this.showDefaultPreview();
        }

        this.iframe.nativeElement.onload = () => {
            clearTimeout(this.timeoutRef);
            this.stopLoading();
        };

        this.getIframeSrc().then(url => {
            this.iframe.nativeElement.src = url;
        }).catch(() => {
            this.showDefaultPreview();
        });

        // if google docs preview iframe is not loaded
        // after 6 seconds, bail and show default preview
        this.timeoutRef = setTimeout(() => {
            this.showDefaultPreview();
        }, 5000);
    }

    public stopLoading() {
        this.loading$.next(false);
    }

    public showDefaultPreview() {
        this.stopLoading();
        this.showDefaultPreview$.next(true);
    }

    public openInNewWindow() {
        window.open(window.location.href, '_blank');
    }

    private getIframeSrc(): Promise<string> {
        return new Promise((resolve, reject) => {
            let previewUrl = this.getSrc();

            // if we're not trying to preview shareable link we will need to generate
            // preview token, otherwise google won't be able to access this file
            if (previewUrl.indexOf('shareable_link') === -1) {
                this.http.post(`uploads/${this.file.id}/add-preview-token`).subscribe(response => {
                    previewUrl += `?preview_token=${response.preview_token}`;
                    resolve(this.getGoogleDocsUrl(previewUrl));
                }, () => reject);
            } else {
                resolve(this.getGoogleDocsUrl(previewUrl));
            }
        });
    }

    private getGoogleDocsUrl(previewUrl: string) {
        return 'https://docs.google.com/gview?embedded=true&url=' + encodeURIComponent(previewUrl);
    }
}
