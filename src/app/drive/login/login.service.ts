import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { DriveState } from '../state/drive-state';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    @Select(DriveState.getAccessToken) accessToken$: Observable<string> 
  	constructor(
      private store: Store,
      private http: HttpClient
    ) {}
    
  	login(params: {email: string, password: string}): Observable<any>{
  		let url = "https://identity-prd.prysm.com/policy/oauth/access_token";
  		let data = 'grant_type=password&username=' + params.email + '&password=' + params.password;
  		let headers = new HttpHeaders({
  			'Authorization': 'Basic MjpzZWNyZXQ=',
  			'Content-Type': 'application/x-www-form-urlencoded',
  			'ClientVersion': '1.1.3.6',
  			'ConnectionType': 'SynthesisAPI',
  			'ClientType': 'Prysm Mobile',
  			'Accept': '/'
  		});
  		return this.http.post(url, data, {headers: headers});
  	}

    checkAccess(): Observable<any>{
      let url = "https://api-prdus.prysm.com/api/v1/users/checkaccess";
      let token = "";
      this.accessToken$.subscribe(i => {
        token = i
      });
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      return this.http.get(url, {headers: headers});
    }
}
