import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";

import {AccountInterface} from "./account.interface";
import {AccountService} from "./account.service";

@Injectable()
export class AccountResolver implements Resolve<AccountInterface>
{
	constructor(private Account:AccountService) {}

	resolve(route:ActivatedRouteSnapshot) : Promise<AccountInterface> {
		return new Promise<AccountInterface>((resolve) => {
			let sub = this.Account.subscribe((account) => {
				resolve(account);
				sub.unsubscribe();
			});
		});
	}
}