import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {PaginationResponse} from '../types/pagination-response';
import {HttpCacheClient} from '../http/http-cache-client';
import {Page} from '../types/models/Page';

@Injectable({
    providedIn: 'root',
})
export class Pages {

    /**
     * Base uri for pages api.
     */
    private baseUri = 'pages';

    /**
     * TagsService Constructor.
     */
    constructor(private http: HttpCacheClient) {}

    /**
     * Fetch all existing pages from the server.
     */
    public getAll(params = {}): Observable<PaginationResponse<Page>> {
        return this.http.getWithCache(this.baseUri, params);
    }

    /**
     * Fetch a page matching specified id.
     */
    public get(id: number|string) {
        return this.http.getWithCache(this.baseUri + '/' + id);
    }

    /**
     * Create a new page.
     */
    public create(data: Object) {
        return this.http.post(this.baseUri, data);
    }

    /**
     * Update existing page.
     */
    public update(id: number, data: Object) {
        return this.http.put(this.baseUri + '/' + id, data);
    }

    /**
     * Delete specified pages.
     */
    public delete(ids: number[]) {
        return this.http.delete(this.baseUri, {ids});
    }
}
