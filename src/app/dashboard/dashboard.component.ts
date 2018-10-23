import { Component, OnInit } from '@angular/core';

import { SwapiService } from '../services/ng4-swapi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	// ToDo make resource of type Root
  resources:any = null;

  constructor(private swapiService: SwapiService) {}

  ngOnInit() {
  	this.getRoot()
  }

  getRoot(): void {
  	this.swapiService.getRoot()
  		.subscribe( resources => this.resources = Object.keys(resources) )
  }

}
