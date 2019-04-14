import { BehaviorSubject, Subject } from 'rxjs';
import { randomString } from '../../core/utils/random-string';
import { UploadedFile } from '../uploaded-file';
import {FileEntry} from '../file-entry';

export interface UploadQueueItemMeta {
    progress: number;
    speed: string;
    eta: string;
    totalBytes: number;
    completedBytes: number;
    error: string|false;
}

export class UploadQueueItem {
    id: string = randomString();
    canceled$: Subject<boolean> = new Subject();

    // file info (static)
    filename: string;
    size: number;
    mime: string;

    // only available on completed uploads
    fileEntry?: FileEntry;

    // meta information (will change)
    meta$: BehaviorSubject<Partial<UploadQueueItemMeta>> = new BehaviorSubject({});

    get completed(): boolean {
        return this.meta$.value.progress === 100;
    }

    get pending(): boolean {
        return this.meta$.value.progress == null;
    }

    get hasError(): boolean {
        return this.meta$.value.error != null;
    }

    constructor(file: UploadedFile) {
        this.filename = file.name;
        this.size = file.size;
        this.mime = file.mime;
    }

    public update(data: Partial<UploadQueueItemMeta>) {
        this.meta$.next({
            ...this.meta$.value,
            ...data,
        });
    }

    public cancel() {
        this.canceled$.next(true);
        this.canceled$.complete();
    }

    public complete() {
        this.update({progress: 100});
    }

    public addError(message: string = '') {
        this.update({error: message});
    }
}
