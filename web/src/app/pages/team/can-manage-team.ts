import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";

import {PermissionsService} from "../../account/permissions.service";

@Injectable()
export class CanManageTeam implements CanActivate
{
	constructor(private Permissions:PermissionsService) {}

	canActivate(route:ActivatedRouteSnapshot) : Promise<boolean> {
		return this.Permissions.isAllowed("manage", "team", route.parent.params.slug);
	}
}