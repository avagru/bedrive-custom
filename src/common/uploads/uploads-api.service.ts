import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileEntry } from './file-entry';
import { UploadedFile } from './uploaded-file';
import { makeUploadPayload } from '../core/utils/make-upload-payload';
import { UploadValidator } from './validation/upload-validator';
import { AppHttpClient } from '../core/http/app-http-client.service';

export interface UploadApiConfig {
    uri?: string;
    validator?: UploadValidator;
    httpParams?: {
        [key: string]: any,
        parentId?: number|null,
        hash?: string;
        total?: number;
        current?: number;
    };
}

@Injectable({
    providedIn: 'root',
})
export class UploadsApiService {
    constructor(private http: AppHttpClient) {}

    public getFileContents(file: FileEntry): Observable<string> {
        return this.http.get('uploads/' + file.id, null, {responseType: 'text'});
    }

    public delete(params: {entryIds: number[], deleteForever: boolean}) {
        return this.http.delete('uploads', params);
    }

    public upload(file: UploadedFile, config: UploadApiConfig = {}) {
        return this.http.postWithProgress(
            config.uri || 'uploads',
            makeUploadPayload(file, config.httpParams),
        );
    }
}
