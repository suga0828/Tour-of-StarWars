import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../hero';

import { HeroService } from '../services/hero.service';
import { SwapiService } from '../services/ng4-swapi.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

	// @Input() hero: Hero;

  item:any;
  url: string = '';
  resource:string;
  id:string;


  constructor(
  	private route: ActivatedRoute,
  	private heroService: HeroService,
    private swapiService: SwapiService,
    private location: LocationService) { }

  ngOnInit() {
    this.resource = this.route.snapshot.params['resource'];
    this.id = this.route.snapshot.params['id']
    this.url = this.resource +'/' + this.id
    console.log(this.url)
    this.getItem(this.url);
  }

  getItem(url: string) {
    this.swapiService.getCallItem(`${this.resource}:${this.id}`,false,url)
      .subscribe( item => {
        console.log(item)
        this.item = item
      })
  }

  // getHero(): void {
  // 	const id = +this.route.snapshot.paramMap.get('id')
  // 	this.heroService.getHero(id)
  // 		.subscribe( hero => this.hero = hero )
  // }

	goBack(): void {
  		this.location.goBack();
	}

  // save(): void {
  //   this.heroService.updateHero(this.hero)
  //     .subscribe( () => this.goBack() )
  // }

}
