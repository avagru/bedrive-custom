import {
    Component, ComponentFactoryResolver, Inject, OnInit, Optional, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Users} from '../auth/users.service';
import {AuthService} from '../auth/auth.service';
import {Toast} from '../core/ui/toast.service';
import {UploadsApiService} from '../uploads/uploads-api.service';
import {ErrorsModel, PasswordModel} from './account-settings-types';
import {Settings} from '../core/config/settings.service';
import {User} from '../core/types/models/User';
import {Translations} from '../core/translations/translations.service';
import {Localizations} from '../core/translations/localizations.service';
import {openUploadWindow} from '../uploads/utils/open-upload-window';
import { AvatarValidator } from './avatar-validator';
import { UploadInputTypes } from '../uploads/upload-input-config';
import { CurrentUser } from '../auth/current-user';
import {ACCOUNT_SETTINGS_PANELS} from './account-settings-panels';
import {ComponentType} from '@angular/cdk/portal';

@Component({
    selector: 'account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AccountSettingsComponent implements OnInit {
    @ViewChild('extraPanelRef', {read: ViewContainerRef}) extraPanelRef: ViewContainerRef;

    public user = new User();
    public password: PasswordModel = {};
    public errors: ErrorsModel = {password: {}, account: {}};

    public selects = {
        timezones: [],
        countries: [],
        localizations: [],
    };

    constructor(
        public settings: Settings,
        private route: ActivatedRoute,
        private users: Users,
        private currentUser: CurrentUser,
        private toast: Toast,
        private uploads: UploadsApiService,
        private i18n: Translations,
        private localizations: Localizations,
        public auth: AuthService,
        private avatarValidator: AvatarValidator,
        private componentFactoryResolver: ComponentFactoryResolver,
        @Optional() @Inject(ACCOUNT_SETTINGS_PANELS) public extraPanels: {component: ComponentType<any>}[]
    ) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.user = data['resolves']['user'];
            this.selects.timezones = data.resolves.selects.timezones;
            this.selects.countries = data.resolves.selects.countries;
            this.selects.localizations = data.resolves.selects.localizations;

            this.loadExtraPanels();
        });
    }

    public updateAccountSettings() {
        this.users.update(this.user.id, this.getAccountSettingsPayload()).subscribe(() => {
            this.toast.open('Account settings updated');
            this.errors.account = {};
        }, response => this.errors.account = response.messages);
    }

    public openAvatarUploadDialog() {
        openUploadWindow({types: [UploadInputTypes.image]}).then(files => {
            if (this.avatarValidator.validateWithToast(files[0]).failed) return;

            this.users.uploadAvatar(this.user.id, files).subscribe(user => {
                this.user.avatar = user.avatar;
                this.currentUser.set('avatar', user.avatar);
                this.toast.open('Avatar updated');
            }, response => {
                const key = Object.keys(response.messages)[0];
                this.toast.open(response.messages[key]);
            });
        });
    }

    public deleteAvatar() {
        this.users.deleteAvatar(this.user.id).subscribe(user => {
            this.user.avatar = user.avatar;
            this.currentUser.set('avatar', user.avatar);
            this.toast.open('Avatar removed');
        });
    }

    public changeUserPassword() {
        this.users.changePassword(this.user.id, this.password)
        .subscribe(() => {
            this.toast.open('Password updated');
            this.errors.password = {};
            this.password = {};
            this.user.has_password = true;
        }, response => this.errors.password = response.messages);
    }

    public changeLanguage(name: string) {
        this.localizations.get(name).subscribe(response => {
            this.i18n.setLocalization(response.localization);
        });
    }

    private getAccountSettingsPayload() {
        return {
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            language: this.user.language,
            timezone: this.user.timezone,
            country: this.user.country,
            avatar: this.user.avatar,
        };
    }

    private loadExtraPanels() {
        if ( ! this.extraPanels || ! this.extraPanels.length) return;

        this.extraPanels.forEach((panelComp: {component: ComponentType<any>}) => {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(panelComp.component);
            this.extraPanelRef.clear();
            const componentRef = this.extraPanelRef.createComponent(componentFactory);
            componentRef.instance.user = this.user;
        });
    }
}
