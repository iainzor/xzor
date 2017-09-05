import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

import {routeAnimation} from "../../ui/utilities/route-animation";
import {AppService} from "../../app.service";
import {AccountService} from "../account.service";
import {AccountInterface} from "../account.interface";

@Component({
	selector: "account-pages",
	templateUrl: "./account-pages.component.html",
	styleUrls: ["./account-pages.component.css"],
	animations: [
		routeAnimation("routeTrigger")
	],
	host: {
		"[@routeTrigger]": ""
	}
})
export class AccountPagesComponent implements OnInit, OnDestroy
{
	private accountSub:Subscription;

	account:AccountInterface;

	constructor(
		private App:AppService,
		private Account:AccountService,
		private Router:Router
	) {}

	ngOnInit() {
		this.accountSub = this.Account.subscribe((account) => {
			this.account = account;

			if (!account.isValid) {
				this.Router.navigate(["/"]);
			}
		});
	}

	ngOnDestroy() {
		this.accountSub.unsubscribe();
	}
}