import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, NavigationStart, NavigationCancel, NavigationEnd, NavigationError} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {AppService} from "./app.service";
import {AccountInterface} from "./account/account.interface";
import {AccountService} from "./account/account.service";
import {NotificationInterface} from "./notifications/notification.interface";
import {NotificationsService} from "./notifications/notifications.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy 
{
	private accountSub:Subscription;
	private routerSub:Subscription;
	private loadingSub:Subscription;

	loading:boolean = false;
	account:AccountInterface;

	constructor(
		private App:AppService,
		private Account:AccountService,
		private Router:Router
	) {}

	ngOnInit() {
		this.accountSub = this.Account.subscribe((account) => {
			this.account = account;
		});
		this.routerSub = this.Router.events.subscribe((e) => {
			let started = e instanceof NavigationStart;
			let canceled = e instanceof NavigationCancel;
			let error = e instanceof NavigationError;
			let end = e instanceof NavigationEnd;

			if (e instanceof NavigationStart) {
				this.App.setLoading(true);
			} else if (canceled || error || end) {
				this.App.setLoading(false);
			}
		});
		this.loadingSub = this.App.loading.subscribe((loading) => {
			setTimeout(() => { this.loading = loading; });
		});
	}

	ngOnDestroy() {
		this.accountSub.unsubscribe();
		this.routerSub.unsubscribe();
		this.loadingSub.unsubscribe();
	}
}
