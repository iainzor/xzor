import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs/Subscription";

import {SourcesService} from "../sources.service";
import {SourceInterface} from "../source.interface";

@Component({
	selector: "sources-search",
	templateUrl: "./sources-search.component.html",
	styleUrls: ["./sources-search.component.css"]
})
export class SourcesSearchComponent implements OnInit, OnDestroy
{
	@Input() q:string;

	private sourcesSub:Subscription;

	sources:SourceInterface[];

	constructor(private Sources:SourcesService) {}

	ngOnInit() {
		this.sourcesSub = this.Sources.subscribe((sources) => {
			this.sources = sources;
		});
	}

	ngOnDestroy() {
		this.sourcesSub.unsubscribe();
	}
}