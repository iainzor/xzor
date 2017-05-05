import {Component, Input, Output, EventEmitter} from "@angular/core";

import {SourceInterface} from "../source.interface";
import {SourcesService} from "../sources.service";
import {SourceSearchResponse} from "./source-search-response";

@Component({
	selector: "source-search",
	templateUrl: "./source-search.component.html",
	styleUrls: ["./source-search.component.css"]
})
export class SourceSearchComponent
{
	lastResponse:SourceSearchResponse;
	active:boolean = true;
	loading:boolean = false;

	@Input() source:SourceInterface;
	@Output() response:EventEmitter<SourceSearchResponse> = new EventEmitter<SourceSearchResponse>();
	
	constructor(private Sources:SourcesService) {}

	@Input() set q(q:string) {
		this.loading = true;
		this.load(q).then((response) => {
			this.lastResponse = response;
			this.loading = false;

			if (this.active) {
				this.response.emit(response);
			}
		});
	}

	toggle(e:MouseEvent) {
		e.preventDefault();
		
		this.active = !this.active;
		if (this.active && this.lastResponse) {
			this.response.emit(this.lastResponse);
		} else {
			this.response.emit(
				new SourceSearchResponse(this.source, "", {})
			);
		}
	}

	load(q:string) : Promise<SourceSearchResponse> {
		return this.Sources.createSourceService(this.source).search(q);
	}
}