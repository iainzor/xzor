import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";

import {PermissionsService} from "../account/permissions.service";
import {TeamsService} from "./teams.service";
import {TeamService} from "./team.service";

@Injectable()
export class TeamResolver implements Resolve<TeamService>
{
	constructor(private Teams:TeamsService, private Team:TeamService, private Permissions:PermissionsService) {}

	resolve(route:ActivatedRouteSnapshot) : Promise<TeamService> {
		return new Promise<TeamService>((resolve) => {
			this.Teams.load(route.params["slug"]).then((team) => {
				this.Team.setTeam(team);
				
				resolve(this.Team);
			});
		});
	}
}