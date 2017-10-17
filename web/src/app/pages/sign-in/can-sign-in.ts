import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";

import {AccountService} from "../../account/account.service";

@Injectable()
export class CanSignIn implements CanActivate
{
	constructor(private Account:AccountService, private Router:Router) {}

	canActivate(route:ActivatedRouteSnapshot) : Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			this.Account.subscribe((account) =>  {
				if (account.isValid) {
					let redirectTo = route.queryParams.redirectTo || "/";

					resolve(false);
					this.Router.navigateByUrl(redirectTo);
				} else {
					resolve(true);
				}
			});
		});
	}
}