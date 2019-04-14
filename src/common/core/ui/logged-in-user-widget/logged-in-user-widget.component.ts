import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {CurrentUser} from '../../../auth/current-user';
import {Settings} from '../../config/settings.service';
import {NavbarDropdownItem} from '../../config/vebto-config';
import {BreakpointsService} from '../breakpoints.service';

@Component({
    selector: 'logged-in-user-widget',
    templateUrl: './logged-in-user-widget.component.html',
    styleUrls: ['./logged-in-user-widget.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoggedInUserWidgetComponent  {
    @Input() showAuthButtons = false;

    constructor(
        public currentUser: CurrentUser,
        public auth: AuthService,
        public config: Settings,
        public breakpoints: BreakpointsService,
    ) {}

    public shouldShowMenuItem(item: NavbarDropdownItem): boolean {
        const hasPermission = !item.permission || this.currentUser.hasPermission(item.permission),
            hasRole = !item.role || this.currentUser.hasRole(item.role);
        return hasPermission && hasRole;
    }
}
