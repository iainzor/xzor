import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import {PersonInterface} from "../../people/person.interface";

@Component({
	selector: "pages-people-list",
	templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit, OnDestroy
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