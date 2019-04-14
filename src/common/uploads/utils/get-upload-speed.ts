import { HttpProgressEvent } from '@angular/common/http';

export function getUploadSpeed(e: HttpProgressEvent, uploadStarted: number) {
    if ( ! e.loaded) return 0;

    const timeElapsed = (new Date() as any) - uploadStarted;
    return e.loaded / (timeElapsed / 1000);
}
