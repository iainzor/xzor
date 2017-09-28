import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {TeamService} from "../../teams/team.service";
import {TeamInterface} from "../../teams/team.interface";

@Component({
	selector: "pages-team-overview",
	templateUrl: "./overview.component.html"
})
export class OverviewComponent implements OnInit, OnDestroy
{
	private teamSub:Subscription;

	team:TeamInterface;

	constructor(private Team:TeamService) {}

	ngOnInit() {
		this.teamSub = this.Team.subscribe((team) => {
			this.team = team;
		});
	}

	ngOnDestroy() {
		this.teamSub.unsubscribe();
	}
}