import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { MessageService } from './message.service';

@Injectable({
	providedIn: 'root'
})

export class SwapiService {

	constructor(
		private http: HttpClient,
		private messageService: MessageService) { }

	baseUrl = 'https://swapi.co/api/'

	// "people": "http://swapi.co/api/people/",
	// "planets": "http://swapi.co/api/planets/",
	// "films": "http://swapi.co/api/films/",
	// "species": "http://swapi.co/api/species/",
	// "vehicles": "http://swapi.co/api/vehicles/",
	// "starships": "http://swapi.co/api/starships/"

	getRoot(wookiee: boolean = false): Observable<any> {
		let type:string = "Root"
		let completeUrl:string = this.baseUrl
		if (wookiee) {completeUrl += '?format=wookiee'}
		console.log(completeUrl)
		return this.http.get<any>(completeUrl)
			.pipe(
				tap( () => this.log(`fetched ${type}`)),
				catchError(this.handleError(`get${type}`, []))
			)
	}

	getCall(resource: string){
		let completeUrl:string = this.baseUrl+resource
		console.log(completeUrl);
		return this.http.get<any>(completeUrl)
			.pipe(
				tap( response => {
					this.log(`fetched ${resource}`)
				}),
				catchError(this.handleError(`get${resource}`, []))
			)
	}

	getPage(url: string) {
		let completeUrl:string = url 
		console.log(url)
		return this.http.get<any>(url)
			.pipe(
				tap( () => this.log(`fetched ${url}`)),
				catchError(this.handleError(`get${url}`, []))
			)
	}

	// ToDo implements wookiee here
	getCallItem(item: string, itemUrl: string){
		let finalUrl = this.baseUrl + itemUrl
		// if (wookiee) {completeUrl += '?format=wookiee'}
		console.log(finalUrl);
		return this.http.get<any>(finalUrl)
			.pipe(
				tap( () => this.log(`fetched ${item}`)),
				catchError(this.handleError(`get${item}`, []))
			)
	}

	/** Log a SwapiService message with the MessageService */
	private log(message: string) {
		this.messageService.add(`SwapiService: ${message}`);
	}

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	//GET Items whose name/title contains search term
	searchItems(resource:string, term: string): Observable<any> {
		if ( !term.trim() ) {
			//if not search term, return empty hero array.
			return of([])
		}
		let search = `${this.baseUrl}${resource}/?search=${term}`
		console.log(search)
		return this.http.get<any>(search)	
			.pipe(
				// It's no necessary use Map here.
				map( (data) => {
					console.log(data)
					return data 
				}),
				tap(_ => this.log(`found heroes matching "${term}`) ),
				catchError(this.handleError<any[]>('searchHeroes', [])),
			)
	}

}