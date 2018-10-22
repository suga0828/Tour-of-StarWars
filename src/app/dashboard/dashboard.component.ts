import { Component, OnInit } from '@angular/core';

// import { Hero } from '../hero';
// import { HeroService } from '../services/hero.service';

import { SwapiService } from '../services/ng4-swapi.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // heroes: Hero[] = []

	// ToDo make resource of type Root
  resources:any = null;

  constructor(
    // private heroService: HeroService,
    private swapiService: SwapiService) { }

  ngOnInit() {
    // this.getHeroes()
  	this.getRoot()
  }

  // getHeroes(): void {
  //   this.heroService.getHeroes()
  //     .subscribe( heroes => this.heroes = heroes.slice(1,5) )
  // }

  getRoot(): void {
  	this.swapiService.getRoot()
  		.subscribe( resources => this.resources = Object.keys(resources) )
  }

}
