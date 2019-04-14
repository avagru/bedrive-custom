import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { DriveState } from '../state/drive-state';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  @Select(DriveState.getUserId) userId$: Observable<string>;
  @Select(DriveState.getAccessToken) accessToken$: Observable<string>;
  constructor(
  	private http: HttpClient
  ) { }
  userId: string;
  accessToken: string;
  getProjects():Observable<any>{
  	this.userId$.subscribe(i => this.userId = i)
  	this.accessToken$.subscribe(i => this.accessToken = i)
  	let url=`https://api-prdus.prysm.com/api/v1/users/${this.userId}/projects`
  	let headers = new HttpHeaders({
  		"Authorization" : `Bearer ${this.accessToken}`	
  	})
  	return this.http.get(url, {headers: headers});
  }
}
