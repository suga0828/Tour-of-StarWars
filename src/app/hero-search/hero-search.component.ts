import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

import { SwapiService } from '../services/ng4-swapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-hero-search',
	templateUrl: './hero-search.component.html',
	styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

	private resource = this.route.snapshot.params['resource']
	items$: Observable<any[]>
	private searchTerms = new Subject<string>()

	constructor(
		private swapiService: SwapiService,
		private route: ActivatedRoute) { }

	//Push a search term into the observable stream.
	search(term: string): void {
		this.searchTerms.next(term)
	}

	ngOnInit(): void {
		this.items$ = this.searchTerms
			.pipe(
				//wait 300ms after each keystroke before considering the term
				debounceTime(300),
				//ignore new term if same as previous term
				distinctUntilChanged(),
				//switch to new search observable each time the term changes
				switchMap( (term:string) => this.swapiService.searchItems(this.resource, term) ),
				map( data => data.results)
			)
	}

}
