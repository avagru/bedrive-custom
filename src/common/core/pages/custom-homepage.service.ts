import {Injectable} from '@angular/core';
import {Route, Router, Routes} from '@angular/router';
import {Settings} from '../config/settings.service';
import {CustomPageComponent} from './custom-page/custom-page.component';

@Injectable({
    providedIn: 'root',
})
export class CustomHomepage {
    private defaultComponents: Routes = [
        {path: 'login', redirectTo: '/login', pathMatch: 'full'},
        {path: 'register', redirectTo: '/register', pathMatch: 'full'},
    ];

    constructor(
        private router: Router,
        private settings: Settings
    ) {}

    public select(userRoutes: Routes = []) {
        this.defaultComponents = this.defaultComponents.concat(userRoutes);

        const type = this.settings.get('homepage.type', 'default'),
            value = this.settings.get('homepage.value');

        if (type === 'default' || ! value) {
            return;
        } else if (type === 'component') {
            return this.setComponentAsHomepage(value);
        } else if (type === 'page') {
            return this.setCustomPageAsHomepage(value);
        }
    }

    public isOnlyForGuests() {
        const type = this.settings.get('homepage.type', 'default'),
            value = this.settings.get('homepage.value');

        return type === 'component' && (value === 'login' || value === 'register');
    }

    public getComponents() {
        return this.defaultComponents;
    }

    private setComponentAsHomepage(name: string) {
        const route = this.defaultComponents.find(comp => comp.path === name);
        this.addRoute(Object.assign({}, route));
    }

    private setCustomPageAsHomepage(id: string|number) {
        const route = {component: CustomPageComponent, data: {id}};
        this.addRoute(route);
    }

    private addRoute(route: Route) {
        const parent = this.getParentHomeRoute();
        route = this.prepareRoute(route);

        // use child routes if parent exists, otherwise use base router config
        const routes = parent ? parent.children : this.router.config;

        // remove already existing home route
        const i = routes.findIndex(route => route.path === '');

        // start new route specified by user
        if (i > -1) {
            routes[i] = route;
        } else {
            routes.unshift(route);
        }
    }

    private getParentHomeRoute(): Route {
        return this.router.config.find(route => {
            return route.data && route.data.name === 'parent-home-route';
        });
    }

    private prepareRoute(route: Route) {
        route.path = '';
        if ( ! route.data) route.data = {};
        route.data.name = 'home';
        return route;
    }
}