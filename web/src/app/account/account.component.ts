import {Component, OnInit, OnDestroy} from "@angular/core";
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

	signOut() {
		this.Account.signOut();
	}
}