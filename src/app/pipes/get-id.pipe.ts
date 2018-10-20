import { Pipe, PipeTransform } from '@angular/core';
import { SwapiService } from '../services/ng4-swapi.service'
import { ActivatedRoute } from '@angular/router';

@Pipe({
	name: 'getId'
})

export class getIdPipe implements PipeTransform {

	transform(completeUrl: string): string {
		let baseUrl = this.swapiService.baseUrl
		let resource = this.route.snapshot.params['resource'];
		baseUrl += resource+'/'
		var id = completeUrl.replace(baseUrl, "");
		return id ? id : completeUrl;
	}

	constructor(
		private swapiService: SwapiService,
		private route: ActivatedRoute) {

	}

}
