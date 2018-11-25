import { Component, OnInit } from '@angular/core';

import { SwapiService } from '../services/ng4-swapi.service';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

	url:string = ''
	resources:any
	previous:string
	next:string

	constructor(
    private swapiService:SwapiService,
    private route: ActivatedRoute,
    private location: LocationService)
  { }

	ngOnInit() {
		this.url = this.route.snapshot.params['resource'];
		this.getCall(this.url);
	}

	getCall(url: string) {
		this.swapiService.getCall(url)
			.subscribe( response => {
				this.resources = response.results
				this.previous = response.previous
				this.next = response.next
			})
	}

	getPage(url: string) {
		this.swapiService.getPage(url)
			.subscribe( response => {
				this.resources = response.results
				this.previous = response.previous
				this.next = response.next
			})
	}

	goBack() {
		this.location.goBack();
	}

}
