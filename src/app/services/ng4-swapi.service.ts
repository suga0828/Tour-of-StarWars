import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

@Injectable({
	providedIn: 'root'
})

export class SwapiService {
	constructor(
		private http: HttpClient,
		private messageService: MessageService) { }

	baseUrl = 'https://swapi.co/api/';

	// "people": "http://swapi.co/api/people/",
	// "planets": "http://swapi.co/api/planets/",
	// "films": "http://swapi.co/api/films/",
	// "species": "http://swapi.co/api/species/",
	// "vehicles": "http://swapi.co/api/vehicles/",
	// "starships": "http://swapi.co/api/starships/"

	getRoot(wookiee: boolean = false): Observable<any> {
		let root:string = "Root"
		let completeUrl: string = this.baseUrl;
		return this.getCallSingle(root, wookiee, completeUrl);
	}

	getCallSingle(type: string, wookiee: boolean, completeUrl: string){
		if (wookiee) {completeUrl += '?format=wookiee'}
		console.log(completeUrl);
		return this.http.get<any>(completeUrl)
			.pipe(
				tap( () => this.log(`fetched ${type}`)),
				catchError(this.handleError(`get${type}`, []))
			)
	}

	getCall(url: string){
		let completeUrl:string = this.baseUrl+url
		console.log(completeUrl);
		return this.http.get<any>(completeUrl)
			.pipe(
				tap( response => {
					this.log(`fetched ${url}`)
				}),
				catchError(this.handleError(`get${url}`, []))
			)
	}

	getPage(url: string) {
		console.log(url)
		return this.http.get<any>(url)
			.pipe(
				tap( () => this.log(`fetched ${url}`)),
				catchError(this.handleError(`get${url}`, []))
			)
	}

	getCallItem(item: string, wookiee: boolean, completeUrl: string){
		let finalUrl = this.baseUrl + completeUrl
		if (wookiee) {completeUrl += '?format=wookiee'}
		console.log(finalUrl);
		return this.http.get<any>(finalUrl)
			.pipe(
				tap( () => this.log(`fetched ${item}`)),
				catchError(this.handleError(`get${item}`, []))
			)
	}


	/** Log a HeroService message with the MessageService */
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

}