import { HttpProgressEvent } from '@angular/common/http';
import { getUploadSpeed } from './get-upload-speed';

export function getUploadETA (e: HttpProgressEvent, uploadStarted: number) {
    if ( ! e.loaded) return 0;

    const uploadSpeed = getUploadSpeed(e, uploadStarted);
    const bytesRemaining = e.total - e.loaded;

    return Math.round(bytesRemaining / uploadSpeed * 10) / 10;
}
