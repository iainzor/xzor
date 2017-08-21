import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import {AccountService} from "../account.service";
import {AccountInterface} from "../account.interface";

@Component({
	selector: "page-account-overview",
	templateUrl: "./overview.component.html"
})
export class OverviewComponent implements OnInit, OnDestroy
{
	private accountSub:Subscription;

	account:AccountInterface;

	constructor(
		private Account:AccountService
	) {}

	ngOnInit() {
		this.accountSub = this.Account.subscribe((account) => {
			this.account = account;
		});
	}

	ngOnDestroy() {
		this.accountSub.unsubscribe();
	}
}