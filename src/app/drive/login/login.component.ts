import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {LoginService} from './login.service';
import { Select, Store } from '@ngxs/store';
import { LoadRemoteUser } from '../state/actions/commands'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
	public model: {email?: string, password?: string, remember?: boolean, hide?: boolean} = {remember: true, hide: true}
    public errors: {email?: string, password?: string} = {}

  	constructor( private loginService: LoginService, private store: Store) { }

  	ngOnInit() {

  	}

  	login() {
        if(this.model.email === '') {
            this.errors.email = "Email is required";
        } else if (!this.validate(this.model.email)) {
            this.errors.email = "Email is incorrect";
        } else if (this.model.password === '') {
            this.errors.password = "Password is required";
        } else {
        	let params = {email: this.model.email, password: this.model.password}
        	this.loginService.login(params).subscribe(i => {
        		let user = { account_id: i.account_id, access_token: i.access_token, expires_in: i.expires_in, user_id: i.user_id }
                localStorage.setItem('account_id', i.account_id);
                localStorage.setItem('access_token', i.access_token);
                localStorage.setItem('expires_in', i.expires_in)
                localStorage.setItem('user_id', i.user_id);
        		this.store.dispatch(new LoadRemoteUser(user));
        	})
        }
    }
    validate(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
	}
}
