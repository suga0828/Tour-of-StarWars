import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../services/ng4-swapi.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css']
})
export class ResourceDetailComponent implements OnInit {

  resource:string
  id:string
  itemUrl: string
  item:any

  constructor(
  	private route: ActivatedRoute,
    private swapiService: SwapiService,
    private location: LocationService)
  { }

  ngOnInit() {
    this.resource = this.route.snapshot.params['resource'];
    this.id = this.route.snapshot.params['id']
    this.itemUrl = this.resource +'/' + this.id
    console.log(this.itemUrl)
    this.getItem(this.itemUrl);
  }

  getItem(itemUrl: string) {
    this.swapiService.getCallItem(`${this.resource}:${this.id}`, itemUrl)
      .subscribe( item => {
        console.log(item)
        this.item = item
      })
  }

	goBack(): void {
  		this.location.goBack();
	}

}
