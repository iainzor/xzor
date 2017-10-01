import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {UINavPageInterface} from "../../../ui/ui-nav/ui-nav-page.interface";
import {TeamInterface} from "../../../teams/team.interface";
import {TeamService} from "../../../teams/team.service";

@Component({
	selector: "pages-team-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit, OnDestroy
{
	private teamSub:Subscription;

	team:TeamInterface = {};
	pages:UINavPageInterface[] = [];

	constructor(private Team:TeamService) {}

	ngOnInit() {
		this.teamSub = this.Team.subscribe((team) => {
			this.team = team;
			this.generatePages();
		});
	}

	ngOnDestroy() {
		this.teamSub.unsubscribe();
	}

	generatePages() {
		let root = "/t/"+ this.team.slug +"/manage";

		this.pages = [
			{ path: [root], title: "Details", activeExact: true },
			{ path: [root, "members"], title: "Members" }
		];
	}
}