import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

import {AppService} from "../../app.service";
import {AccountService} from "../account.service";
import {AccountInterface} from "../account.interface";

@Component({
	selector: "page-sign-in",
	templateUrl: "./page-sign-in.component.html",
	styleUrls: ["./page-sign-in.component.css"]
})
export class PageSignInComponent implements OnInit, OnDestroy
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

			if (this.account.isValid) {
				this.Router.navigate(["/account"]);
			}
		});
	}

	ngOnDestroy() {
		this.accountSub.unsubscribe();
	}

	onSignInStart() {
		this.App.setLoading(true);
	}

	onSignInFinish() {
		this.App.setLoading(false);
		this.Router.navigate(["/account"], { replaceUrl: true });
	}
}