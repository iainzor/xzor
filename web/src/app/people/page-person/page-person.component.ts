import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import {routeAnimation} from "../../ui/utilities/route-animation";
import {PersonInterface} from "../person.interface";

@Component({
	selector: "page-person",
	templateUrl: "./page-person.component.html",
	animations: [
		routeAnimation("person")
	],
	host: {
		"[@person]": ""
	}
})
export class PagePersonComponent implements OnInit, OnDestroy
{
	private dataSub:Subscription;

	person:PersonInterface;

	constructor(private route:ActivatedRoute) {}

	ngOnInit() {
		this.dataSub = this.route.data.subscribe((data) => {
			this.person = data["person"];
		});
	}

	ngOnDestroy() {
		this.dataSub.unsubscribe();
	}
}