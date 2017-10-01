import {Component, Input, OnInit} from "@angular/core";

import {TeamInterface} from "../team.interface";
import {TeamService} from "../team.service";
import {TeamsService} from "../teams.service";

@Component({
	selector: "team-membership-settings",
	templateUrl: "./team-membership-settings.component.html"
})
export class TeamMembershipSettingsComponent implements OnInit
{
	team:TeamInterface;
	definitions:any = {};
	settings:any = {};

	constructor(
		private Teams:TeamsService,
		private Team:TeamService
	) {}

	ngOnInit() {
		this.Teams.loadAvailableSettings().then((definitions) => {
			this.definitions = definitions;
		});
	}

	@Input("team") set _team(team:TeamInterface) {
		this.team = team;
		this.Team.loadSettings().then((settings) => {
			this.settings = settings;
		});
	};

	save() {
		console.log("Saving", this.settings);
	}
}