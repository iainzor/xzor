import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";

import {PermissionsService} from "../account/permissions.service";
import {Permissions} from "../account/permissions";
import {TeamService} from "./team.service";

@Injectable()
export class TeamPermissionsResolver implements Resolve<Permissions>
{
	constructor(private Permissions:PermissionsService, private Team:TeamService) {}

	resolve(route:ActivatedRouteSnapshot) : Promise<Permissions> {
		let promise = this.Permissions.forResource("team", route.params.slug);
		promise.then((permissions) => {
			this.Team.setPermissions(permissions);
		});

		return promise;
	}
}