import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

import {routeAnimation} from "../ui/utilities/route-animation";
import {AppService} from "../app.service";
import {AccountService} from "./account.service";
import {AccountInterface} from "./account.interface";

@Component({
	selector: "account",
	templateUrl: "./account.component.html",
	styleUrls: ["./account.component.css"],
	animations: [
		routeAnimation("routeTrigger")
	],
	host: {
		"[@routeTrigger]": ""
	}
})
export class AccountComponent implements OnInit, OnDestroy
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
				this.Router.navigate(["/account", "sign-in"]);
			}
		});
	}

	ngOnDestroy() {
		this.accountSub.unsubscribe();
	}

	signOut(e:MouseEvent) {
		e.preventDefault();
		
		this.App.setLoading(true);
		this.Account.signOut().then(() => {
			this.App.setLoading(false);	
		});
	}
}