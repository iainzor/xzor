import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";

import {TeamsService} from "./teams.service";
import {TeamInterface} from "./team.interface";

@Injectable()
export class TeamsResolver implements Resolve<TeamInterface[]>
{
	constructor(private Teams:TeamsService) {}

	resolve(route:ActivatedRouteSnapshot) : Promise<TeamInterface[]> {
		return this.Teams.loadAll(route.data);
	}
}