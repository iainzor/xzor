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
	private loadingSub:Subscription;

	account:AccountInterface;
	loading:boolean = true;

	constructor(
		private App:AppService,
		private Account:AccountService
	) {}

	ngOnInit() {
		this.accountSub = this.Account.subscribe((account) => {
			this.account = account;
		});
		this.loadingSub = this.Account.loading.subscribe((flag) => {
			this.App.setLoading(flag);
			this.loading = flag;
		});
	}

	ngOnDestroy() {
		this.accountSub.unsubscribe();
		this.loadingSub.unsubscribe();
	}
}