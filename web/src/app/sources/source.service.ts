import {URLSearchParams} from "@angular/http";

import {XzorService} from "../xzor/xzor.service";
import {SourceInterface} from "./source.interface";
import {SourceSearchResponse} from "./source-search/source-search-response";

export class SourceService
{
	constructor(public source:SourceInterface, private Xzor:XzorService) {}

	search(q:string) : Promise<SourceSearchResponse> {
		let params = new URLSearchParams();
		params.set("q", q);

		return new Promise<SourceSearchResponse>((resolve, reject) => {	
			this.Xzor
				.get("sources/"+ this.source.slug +"/search.json", params)
				.then((data) => {
					let response = new SourceSearchResponse(this.source, q, data.results);
					resolve(response);	
				});
		});
	}

	load<T>(category:string, id:string) : Promise<T> {
		return this.Xzor.get("sources/"+ this.source.slug +"/"+ category +"/"+ id +".json");
	}
}