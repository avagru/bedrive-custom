import {Injectable} from '@angular/core';
import {AppHttpClient} from '../core/http/app-http-client.service';
import {BackendResponse} from '../core/types/backend-response';

@Injectable({
    providedIn: 'root'
})
export class ArtisanService {
    constructor(private http: AppHttpClient) {}

    public call(payload: {command: string, params?: {[key: string]: string|number}}): BackendResponse<void> {
        return this.http.post('artisan/call', payload);
    }
}
