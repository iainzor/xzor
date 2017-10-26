import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {AccountInterface} from "../../account/account.interface";
import {AccountService} from "../../account/account.service";

@Component({
	selector: "pages-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy
{
	private accountSub:Subscription;

	account:AccountInterface;

	constructor(private Account:AccountService) {}

	ngOnInit() {
		this.accountSub = this.Account.subscribe((account) => {
			this.account = account;
		});
	}

	ngOnDestroy() {
		this.accountSub.unsubscribe();
	}
}