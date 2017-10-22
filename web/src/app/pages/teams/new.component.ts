import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {NotificationsService} from "../../notifications/notifications.service";
import {TeamInterface} from "../../teams/team.interface";

@Component({
	selector: "pages-teams-new",
	templateUrl: "new.component.html",
	styleUrls: ["./new.component.css"]
})
export class NewComponent
{
	team:TeamInterface = {};

	constructor(
		private Notifications:NotificationsService,
		private Router:Router
	) {}

	onTeamSave(team:TeamInterface) {
		this.Notifications.push({
			message: "Your new team, "+ team.name +", has been created"
		});
		this.Router.navigate(["/t", team.slug]);
	}
}