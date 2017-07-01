import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import {AccountInterface} from "../account.interface";

@Component({
	selector: "page-account-overview",
	templateUrl: "./page-account-overview.component.html"
})
export class PageAccountOverviewComponent implements OnInit, OnDestroy
{
	private accountSub:Subscription;

	account:AccountInterface;

	constructor(
		private Route:ActivatedRoute
	) {}

	ngOnInit() {
		this.accountSub = this.Route.data.subscribe((data) => {
			this.account = data["account"];
		});
	}

	ngOnDestroy() {
		this.accountSub.unsubscribe();
	}
}