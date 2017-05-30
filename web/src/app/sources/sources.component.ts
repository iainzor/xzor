import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

import {routeAnimation} from "../ui/utilities/route-animation";
import {SourceInterface} from "./source.interface";

@Component({
	selector: "sources",
	templateUrl: "./sources.component.html",
	styleUrls: ["./sources.component.css"],
	animations: [
		routeAnimation("sources")
	],
	host: {
		"[@sources]": ""
	}
})
export class SourcesComponent implements OnInit, OnDestroy
{
	private dataSub:Subscription;

	sources:SourceInterface[];

	constructor(private Route:ActivatedRoute) {}

	ngOnInit() {
		this.dataSub = this.Route.data.subscribe((data) => {
			this.sources = data["sources"];
		});
	}

	ngOnDestroy() {
		this.dataSub.unsubscribe();
	}
}