import {Component, Input} from "@angular/core";

import {AppService} from "../../app.service";
import {AccountInterface} from "../account.interface";
import {AccountService} from "../account.service";

@Component({
	selector: "account-menu",
	templateUrl: "./account-menu.component.html",
	styleUrls: ["./account-menu.component.css"]
})
export class AccountMenuComponent
{
	@Input() account:AccountInterface;

	constructor(
		private App:AppService,
		private Account:AccountService
	) {}
	
	signOut(e:MouseEvent) {
		e.preventDefault();
		
		this.App.setLoading(true);
		this.Account.signOut().then(() => {
			this.App.setLoading(false);	
		});
	}
}