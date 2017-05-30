import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

import {routeAnimation} from "../ui/utilities/route-animation";
import {SourceInterface} from "./source.interface";

@Component({
	selector: "source",
	templateUrl: "./source.component.html",
	styleUrls: ["./source.component.css"],
	animations: [
		routeAnimation("source")
	],
	host: {
		"[@source]": ""
	}
})
export class SourceComponent implements OnInit, OnDestroy
{
	private dataSub:Subscription;

	source:SourceInterface;

	constructor(private Route:ActivatedRoute) {}

	ngOnInit() {
		this.dataSub = this.Route.data.subscribe((data) => {
			this.source = data["source"];
		});
	}

	ngOnDestroy() {
		this.dataSub.unsubscribe();
	}
}