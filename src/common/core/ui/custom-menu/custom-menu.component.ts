import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {Subscription} from 'rxjs';
import {Menu} from './menu';
import {MenuItem} from './menu-item';
import {Settings} from '../../config/settings.service';
import {snakeCase} from '../../utils/snake-case';
import { CurrentUser } from '../../../auth/current-user';
import {getQueryParams} from '../../utils/get-query-params';

@Component({
    selector: 'custom-menu',
    templateUrl: './custom-menu.component.html',
    styleUrls: ['./custom-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CustomMenuComponent implements OnInit, OnDestroy {
    @HostBinding('class.hidden') shouldHide = false;
    @Input() position: string;
    @Input() showTitle = false;
    @Input() itemClass = null;
    public menu = new Menu();
    public subscriptions: Subscription[] = [];

    constructor(
        private settings: Settings,
        private currentUser: CurrentUser,
        private changeDetector: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.initMenu();

        // re-render if menu setting is changed
        const sub = this.settings.onChange.subscribe(name => {
            if (name === 'menus') this.initMenu(true);
        });

        this.subscriptions.push(sub);
    }

    /**
     * Convert specified string to snake_case.
     */
    public toSnakeCase(string: string) {
        return snakeCase(string);
    }

    /**
     * Check if menu item should be displayed.
     */
    public shouldShow(item: MenuItem): boolean {
        if ( ! item) return false;

        switch (item.condition) {
            case 'auth':
                return this.currentUser.isLoggedIn();
            case 'guest':
                return !this.currentUser.isLoggedIn();
            case 'admin':
                return this.currentUser.hasPermission('admin');
            case  'agent':
                return this.currentUser.hasPermission('tickets.update');
            default:
                return true;
        }
    }

    /**
     * If link is to the site or it's relative, return 'route' type.
     */
    public getItemType(item: MenuItem): string {
        if (item.type === 'link' && item.action.indexOf('//') === -1) return 'route';
        if (item.action.indexOf(this.settings.getBaseUrl(true)) > -1) return 'route';
        return item.type;
    }

    public parseRoute(action: string) {
        const parts = action.split('?');
        return {link: parts[0], queryParams: getQueryParams(action)};
    }

    private initMenu(detectChanges = false) {
        const json = this.settings.get('menus');

        // get stored custom menus
        const menus = JSON.parse(json);
        if ( ! menus) return this.shouldHide = true;

        // find first menu for specified position
        const menuConfig = menus.find(menu => menu.position === this.position);
        if ( ! menuConfig) return this.shouldHide = true;

        this.menu = new Menu(menuConfig);

        if (detectChanges) {
            this.changeDetector.detectChanges();
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription && subscription.unsubscribe();
        });
    }
}
