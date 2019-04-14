import {Injectable} from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import {AppHttpClient} from '../../core/http/app-http-client.service';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { BackendResponse } from '../../core/types/backend-response';

@Injectable({
    providedIn: 'root'
})
export class AppearanceEditorResolver implements Resolve<BackendResponse<{[key: string]: any}>> {
    constructor(
        private router: Router,
        private http: AppHttpClient
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): BackendResponse<{[key: string]: any}> {
        return this.http.get('admin/appearance/values').pipe(
            catchError(() => {
                this.router.navigate(['/admin']);
                return EMPTY;
            }),
            mergeMap(response => {
                if (response) {
                    return of(response);
                } else {
                    this.router.navigate(['/admin']);
                    return EMPTY;
                }
            })
        );
    }
}

