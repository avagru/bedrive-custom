import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../auth.service';
import {SocialAuthService} from '../social-auth.service';
import {CurrentUser} from '../current-user';
import {Router} from '@angular/router';
import {Settings} from '../../core/config/settings.service';
import {Toast} from '../../core/ui/toast.service';
import {Bootstrapper} from '../../core/bootstrapper.service';
import {RecaptchaService} from '../../core/services/recaptcha.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
    public model: {
        email?: string,
        password?: string,
        password_confirmation?: string,
        purchase_code?: string
    } = {};

    public errors: {
        email?: string,
        password?: string,
        general?: string,
        purchase_code?: string
    } = {};

    public isLoading = false;

    constructor(
        public auth: AuthService,
        public socialAuth: SocialAuthService,
        public settings: Settings,
        private user: CurrentUser,
        private router: Router,
        private toast: Toast,
        private bootstrapper: Bootstrapper,
        private recaptcha: RecaptchaService,
    ) {}

    ngOnInit() {
        if (this.recaptcha.enabledFor('registration')) {
            this.recaptcha.load();
        }
    }

    public async register() {
        this.isLoading = true;

        if (this.recaptcha.enabledFor('registration') && ! await this.recaptcha.verify('registration')) {
            this.isLoading = false;
            return this.toast.open('Could not verify you are human.');
        }

        this.auth.register(this.model).subscribe(response => {
            this.isLoading = false;

            if (this.settings.get('require_email_confirmation')) {
                this.router.navigate(['/login']).then(() => {
                    this.toast.open('We have sent you an email with instructions on how to activate your account.');
                });
            } else {
                this.bootstrapper.bootstrap(response.data);
                this.router.navigate([this.auth.getRedirectUri()]).then(() => {
                    this.toast.open('Registered successfully.');
                });
            }
        }, response => {
            this.errors = response['messages'];
            this.isLoading = false;
        });
    }
}
