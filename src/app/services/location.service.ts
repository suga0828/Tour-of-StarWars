import { Injectable } from '@angular/core';

import { Location } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class LocationService {

	goBack(): void {
  		this.location.back();
	}

	constructor(private location: Location) {}

}
