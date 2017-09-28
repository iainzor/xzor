import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";

import {PermissionsService} from "../../account/permissions.service";

@Injectable()
export class CanActivateAdminService implements CanActivate
{
	constructor(private Permissions:PermissionsService, private Router:Router) {}

	canActivate(route:ActivatedRouteSnapshot) : Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			this.Permissions.forResource("team", route.parent.params.slug).then((p) => {
				let isAllowed = p.isAllowed("manage");
				if (!isAllowed) {
					this.Router.navigate(["/t", route.parent.params.slug], { replaceUrl: true });
				}
				resolve(isAllowed);
			});
		});
	}
}