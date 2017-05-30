import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, NavigationStart, NavigationCancel, NavigationEnd, NavigationError} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {AppService} from "./app.service";
import {AccountInterface} from "./account/account.interface";
import {AccountService} from "./account/account.service";

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

	account:AccountInterface;
	loading:boolean = true;
	menuOpen:boolean = false;

	constructor(
		private App:AppService,
		private Account:AccountService,
		private Router:Router
	) {}

	ngOnInit() {
		this.accountSub = this.Account.subscribe((account) => {
			this.account = account;
		});
		this.loadingSub = this.App.loading.subscribe((loading) => {
			this.loading = loading;
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
	}

	ngOnDestroy() {
		this.accountSub.unsubscribe();
		this.routerSub.unsubscribe();
		this.loadingSub.unsubscribe();
	}

	toggleMenu(e:MouseEvent) {
		e.preventDefault();
		if (this.menuOpen) {
			this.closeMenu();
		} else {
			this.openMenu();
		}
	}

	closeMenu() { this.menuOpen = false; }

	openMenu() { this.menuOpen = true; }
}
