import { HttpProgressEvent} from '@angular/common/http';

export function getUploadProgress(e: HttpProgressEvent): number {
    return Math.round(100 * e.loaded / e.total);
}
