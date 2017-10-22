import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {NotificationsService} from "../../../notifications/notifications.service";
import {TeamService} from "../../../teams/team.service";
import {TeamInterface} from "../../../teams/team.interface";

@Component({
	selector: "pages-team-admin-index",
	templateUrl: "./index.component.html"
})
export class IndexComponent implements OnInit, OnDestroy
{
	private teamSub:Subscription;
	
	team:TeamInterface;

	constructor(
		private Notifications:NotificationsService,
		private Team:TeamService
	) {}

	ngOnInit() {
		this.teamSub = this.Team.subscribe((team) => {
			this.team = team;
		});
	}

	ngOnDestroy() {
		this.teamSub.unsubscribe();
	}

	onSave(team:TeamInterface) {
		this.Notifications.push({
			title: "Success",
			message: "Your team, "+ team.name +", has been updated successfully"
		});
	}
}