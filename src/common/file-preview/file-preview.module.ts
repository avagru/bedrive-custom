import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextPreviewComponent } from './text-preview/text-preview.component';
import { AVAILABLE_PREVIEWS, DefaultPreviews } from './available-previews';
import { PreviewContainerComponent } from './preview-container/preview-container.component';
import { PortalModule } from '@angular/cdk/portal';
import { VideoPreviewComponent } from './video-preview/video-preview.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component';
import { DefaultPreviewComponent } from './default-preview/default-preview.component';
import { MatButtonModule } from '@angular/material';
import { AudioPreviewComponent } from './audio-preview/audio-preview.component';
import { GoogleDocsViewerComponent } from './google-docs-viewer/google-docs-viewer.component';
import { UiModule } from '../core/ui/ui.module';

@NgModule({
    imports: [
        CommonModule,
        UiModule,

        // material
        PortalModule,
        MatButtonModule,
    ],
    exports: [
        PreviewContainerComponent,
    ],
    declarations: [
        PreviewContainerComponent,
        TextPreviewComponent,
        VideoPreviewComponent,
        ImagePreviewComponent,
        PdfPreviewComponent,
        DefaultPreviewComponent,
        AudioPreviewComponent,
        GoogleDocsViewerComponent
    ],
    entryComponents: [
        TextPreviewComponent,
        VideoPreviewComponent,
        ImagePreviewComponent,
        PdfPreviewComponent,
        DefaultPreviewComponent,
        AudioPreviewComponent,
        GoogleDocsViewerComponent,
    ],
    providers: [
        {provide: AVAILABLE_PREVIEWS, useClass: DefaultPreviews},
    ]
})
export class FilePreviewModule {
}
