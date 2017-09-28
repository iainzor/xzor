import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import {TeamInterface} from "../../teams/team.interface";

@Component({
	selector: "pages-teams-my-teams",
	templateUrl: "./my-teams.component.html"
})
export class MyTeamsComponent implements OnInit, OnDestroy
{
	private dataSub:Subscription;

	teams:TeamInterface[] = [];

	constructor(private Route:ActivatedRoute) {}

	ngOnInit() {
		this.dataSub = this.Route.data.subscribe((data) => {
			this.teams = data["teams"];
		});
	}

	ngOnDestroy() {
		this.dataSub.unsubscribe();
	}
}