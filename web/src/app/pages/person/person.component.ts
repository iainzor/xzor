import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import {PersonInterface} from "../../people/person.interface";
import {routeAnimation} from "../../ui/utilities/route-animation";

@Component({
	selector: "pages-person",
	templateUrl: "./person.component.html",
	animations: [
		routeAnimation("personAnimate")
	],
	host: {
		"[@personAnimate]": ""
	}
})
export class PersonComponent implements OnInit, OnDestroy
{
	private dataSub:Subscription;

	person:PersonInterface;

	constructor(private Route:ActivatedRoute) {}

	ngOnInit() {
		this.dataSub = this.Route.data.subscribe((data) => {
			this.person = data["person"];
		});
	}

	ngOnDestroy() {
		this.dataSub.unsubscribe();
	}
}