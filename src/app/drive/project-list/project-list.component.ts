import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {ProjectServiceService} from './project-service.service'
import {Observable} from 'rxjs';
import { LoginService } from '../login/login.service'
import {ProjectModel} from './project-model.model'

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  constructor(
  	private projectService: ProjectServiceService,
  	private loginService: LoginService
  ) { }
  pLists$: Observable<ProjectModel[]>;

  ngOnInit() {
  	 this.getProjects();
  }
  getProjects(){
  	// this.loginService.checkAccess().subscribe((j) => {
  		// if (j.Payload) {
  			this.projectService.getProjects().subscribe((i) => {
		  		this.pLists$ = i.Payload
		  		console.log(this.pLists$)
		  	})
  		// } else {

  		// }
  	// })
  	
  	// console.log(1);
  	return this.projectService.getProjects().subscribe();
  }
}
