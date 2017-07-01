import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import {AppService} from "../../app.service";
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
		private Router:Router,
		private Route:ActivatedRoute
	) {}

	ngOnInit() {
		this.accountSub = this.Route.data.subscribe((data) => {
			this.account = data["account"];

			if (this.account.isValid) {
				this.Router.navigate(["/account"]);
			}
		});
	}

	ngOnDestroy() {

	}

	onSignInStart() {
		this.App.setLoading(true);
	}

	onSignInFinish() {
		this.App.setLoading(false);
		this.Router.navigate(["/account"], { replaceUrl: true });
	}
}