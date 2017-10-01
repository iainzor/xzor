import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";

import {PermissionsService} from "../../account/permissions.service";
import {TeamService} from "../../teams/team.service";

@Injectable()
export class CanJoinTeam implements CanActivate
{
	constructor(private Permissions:PermissionsService) {}

	canActivate(route:ActivatedRouteSnapshot) : Promise<boolean> {
		return this.Permissions.isAllowed("join", "team", route.parent.params.slug);
	}
}