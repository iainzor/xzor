import {Component, Input, Output, EventEmitter} from "@angular/core";

import {environment} from "../../../environments/environment";
import {NotificationsService} from "../../notifications/notifications.service";
import {AccountInterface} from "../account.interface";
import {AccountService} from "../account.service";

@Component({
	selector: "account-form",
	templateUrl: "./account-form.component.html"
})
export class AccountFormComponent
{
	@Input() account:AccountInterface;

	isValid:boolean = true;
	errors:any = {};
	environment = environment;

	constructor(
		private Account:AccountService,
		private Notifications:NotificationsService
	) {}

	submit() {
		this.Account.update(this.account).then((response) => {
			this.isValid = response.isValid;
			this.errors = response.errors || {};

			if (this.isValid) {
				this.Notifications.push({
					message: "Your profile has been updated successfully"
				});
			}
		});
	}
}