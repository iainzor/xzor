import {Component, Input, OnInit} from "@angular/core";

import {TeamInterface} from "../team.interface";
import {TeamMemberInterface} from "../team-member.interface";
import {TeamsService} from "../teams.service";

@Component({
	selector: "team-members",
	templateUrl: "./team-members.component.html"
})
export class TeamMembersComponent
{
	team:TeamInterface;
	members:TeamMemberInterface[];

	constructor(private Teams:TeamsService) {}

	
	@Input("team") set _team(team:TeamInterface) {
		this.team = team;

		if (team) {
			this.load();
		}
	}
	
	load() {
		this.Teams.loadMembers(this.team.slug).then((members) => {
			this.members = members;
		});
	}
}