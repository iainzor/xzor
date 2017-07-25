import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import {routeAnimation} from "../../ui/utilities/route-animation";
import {PersonInterface} from "../person.interface";

@Component({
	selector: "page-people",
	templateUrl: "./page-people.component.html",
	styleUrls: ["./page-people.component.css"],
	animations: [
		routeAnimation("people")
	],
	host: {
		"[@people]": ""
	}
})
export class PagePeopleComponent implements OnInit, OnDestroy
{
	private dataSub:Subscription;

	people:PersonInterface[];
	
	constructor(private route:ActivatedRoute) {}

	ngOnInit() {
		this.dataSub = this.route.data.subscribe((data) => {
			this.people = data["people"];
		});
	}

	ngOnDestroy() {
		this.dataSub.unsubscribe();
	}
}