import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CurrentUser } from '../auth/current-user';
import { Settings } from '../core/config/settings.service';
import { AppearanceListenerService } from '../shared/appearance/appearance-listener.service';
import {CustomHomepage} from '../core/pages/custom-homepage.service';

@Injectable({
    providedIn: 'root',
})
export class GuestGuard implements CanActivate {
    constructor(
        private currentUser: CurrentUser,
        private auth: AuthService,
        private router: Router,
        private settings: Settings,
        private listener: AppearanceListenerService,
        private homepage: CustomHomepage,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // allow to view guest pages in appearance editor
        if (this.listener.active) return true;

        // user is not logged in
        if ( ! this.currentUser.isLoggedIn()) return true;

        let redirectUri = this.auth.getRedirectUri(),
            fallbackRedirectUri = this.settings.get('vebto.auth.fallbackRedirectUri');

        if (redirectUri === '/' && this.homepage.isOnlyForGuests() && fallbackRedirectUri) {
            redirectUri = fallbackRedirectUri;
        }

        this.router.navigate([redirectUri]);

        return false;
    }
}
