import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Settings} from '../core/config/settings.service';
import {AppHttpClient} from '../core/http/app-http-client.service';
import {Toast} from '../core/ui/toast.service';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {RecaptchaService} from '../core/services/recaptcha.service';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements OnInit {
    public loading = new BehaviorSubject(false);

    public model = new FormGroup({
        name: new FormControl(),
        email: new FormControl(),
        message: new FormControl()
    });

    public errors: {
        name?: string;
        email?: string;
        message?: string;
    } = {};

    constructor(
        public settings: Settings,
        private http: AppHttpClient,
        private toast: Toast,
        private router: Router,
        private recaptcha: RecaptchaService,
    ) {}

    ngOnInit() {
        if (this.recaptcha.enabledFor('contact')) {
            this.recaptcha.load();
        }
    }

    public async submitMessage() {
        this.loading.next(true);

        if (this.recaptcha.enabledFor('contact') && ! await this.recaptcha.verify('contact')) {
            return this.toast.open('Could not verify you are human.');
        }

        this.http.post('contact-page', this.model.value)
            .pipe(finalize(() => {
                this.loading.next(false);
            })).subscribe(() => {
                this.errors = {};
                this.toast.open('Your message has been submitted.');
                this.router.navigate(['/']);
            }, errorResponse => {
                this.errors = errorResponse.messages;
            });
    }
}
