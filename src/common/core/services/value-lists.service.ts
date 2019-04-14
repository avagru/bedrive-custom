import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpCacheClient} from '../http/http-cache-client';
import {BackendResponse} from '../types/backend-response';

export interface Currency {
    name: string;
    decimal_digits: number;
    symbol: string;
    code: string;
}

export interface SelectOptionLists {
    countries?: CountryListItem[];
    timezones?: string[];
    languages?: LanguageListItem[];
    currencies?: {[key: string]: Currency};
}

export interface CountryListItem {
    name: string;
    code: string;
}

export interface LanguageListItem {
    name: string;
    nativeName?: string;
    code: string;
}

@Injectable({
    providedIn: 'root',
})
export class ValueLists {
    constructor(private httpClient: HttpCacheClient) {}

    public get(names: string[]): BackendResponse<SelectOptionLists> {
        return this.httpClient.getWithCache('value-lists/' + names.join(','));
    }

    public getPermissions(): Observable<{permissions: object}> {
        return this.httpClient.getWithCache('value-lists/permissions');
    }
}
