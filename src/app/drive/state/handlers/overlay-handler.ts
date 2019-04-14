import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { OpenFilePreview } from '../actions/commands';
import { OverlayPanel } from 'common/core/ui/overlay-panel/overlay-panel.service';
import { FilePreviewOverlayComponent } from '../../preview/file-preview-overlay/file-preview-overlay.component';
import { DriveState } from '../drive-state';

export class OverlayHandler {
    constructor(
        private store: Store,
        private actions$: Actions,
        private overlay: OverlayPanel,
    ) {
        this.actions$.pipe(ofActionSuccessful(OpenFilePreview))
            .subscribe((action: OpenFilePreview) => {
                this.overlay.open(FilePreviewOverlayComponent, {
                    position: 'center',
                    origin: 'global',
                    panelClass: 'file-preview-overlay-container',
                    data: {entries: action.entries || this.selectedEntries()}
                });
            });
    }

    private selectedEntries() {
        return this.store.selectSnapshot(DriveState.selectedEntries);
    }
}
