import {Component, Input, Output, EventEmitter} from "@angular/core";

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
	errors:{[field:string]:string} = {};

	constructor(
		private Account:AccountService
	) {}

	submit() {
		this.Account.update(this.account).then((response) => {
			this.isValid = response.isValid;
			this.errors = response.errors || {};
		});
	}
}