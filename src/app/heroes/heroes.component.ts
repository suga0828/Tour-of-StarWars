import { Component, OnInit } from '@angular/core';

// import { Hero } from '../hero';

// import { HeroService } from '../services/hero.service';

import { SwapiService } from '../services/ng4-swapi.service';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

	// heroes:Hero[]

	url:string = '';
	detailUrl:string = '';
	resources:any
	previous:string
	next:string

	// getHeroes(): void {
	//    this.heroService.getHeroes()
	//      .subscribe( heroes => this.heroes = heroes );
	//  }

	//  add(name: string): void {
	// 	name = name.trim()
	// 	if (!name) { return }
	//    this.heroService.addHero( { name } as Hero)
	//  		.subscribe( hero => this.heroes.push(hero) )
	// }

	// delete(hero: Hero): void {
	// 	this.heroes = this.heroes.filter( h => h !== hero)
	// 	this.heroService.deleteHero(hero).subscribe()

	// }

	constructor(// private heroService: HeroService
    	private swapiService:SwapiService,
    	private route: ActivatedRoute,
    	private location: LocationService) { }

	ngOnInit() {
		// this.getHeroes();
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
