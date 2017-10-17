import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router}  from "@angular/router";

import {PermissionsService} from "../../account/permissions.service";

@Injectable()
export class CanCreateTeam implements CanActivate 
{
	constructor(private Permissions:PermissionsService, private Router:Router) {}

	canActivate(route:ActivatedRouteSnapshot) : Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			this.Permissions.forResource("teams").then((permissions) => {
				if (permissions.isAllowed("new")) {
					resolve(true);
				} else {
					resolve(false);
					this.Router.navigate(["/sign-in"], {
						queryParams: {
							redirectTo: "teams/new"
						}
					});
				}
			});
		});
	}
}