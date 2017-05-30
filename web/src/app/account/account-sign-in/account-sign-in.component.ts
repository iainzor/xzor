import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {AccountService} from "../account.service";
import {ProvidersService} from "../providers.service";
import {ProviderInterface} from "../provider.interface";

@Component({
	selector: "account-sign-in",
	templateUrl: "./account-sign-in.component.html",
	styleUrls: ["./account-sign-in.component.css"]
})
export class AccountSignInComponent implements OnInit, OnDestroy
{	
	private providersSub:Subscription;

	providers:ProviderInterface[] = [];

	constructor(
		private Account:AccountService,
		private Providers:ProvidersService
	) {}

	ngOnInit() {
		this.providersSub = this.Providers.all.subscribe((providers) => {
			this.providers = providers;
		});
	}

	ngOnDestroy() {
		this.providersSub.unsubscribe();
	}

	signIn(e:MouseEvent, provider:ProviderInterface) {
		e.preventDefault();
		provider.signIn().then((session) => {
			this.Providers.verify(provider).then((response) => {
				this.Account.load();
			});
		});
	}
}