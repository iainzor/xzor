import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, NavigationStart, NavigationCancel, NavigationEnd, NavigationError} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {AppService} from "./app.service";
import {AccountInterface} from "./account/account.interface";
import {AccountService} from "./account/account.service";
import {NotificationInterface} from "./notifications/notification.interface";
import {NotificationsService} from "./notifications/notifications.service";
import {UIMenuItemInterface} from "./ui/ui-menu/ui-menu-item.interface";

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

	private navMenuItem = { title: "Navigation", hideTitle: true, icon: "menu", onClick: this.toggleNavMenu.bind(this) };
	private accountMenuItem = { title: "Account", hideTitle: true, icon: "face", onClick: this.toggleAccountMenu.bind(this) };
	private notificationsMenuItem = { title: "Notifications", hideTitle: true, icon: "notifications", onClick: this.toggleNotificationMenu.bind(this) };

	loading:boolean = false;
	account:AccountInterface;

	navOpen:boolean = false;
	accountOpen:boolean = false;
	notificationsOpen:boolean = false;

	menuItems:UIMenuItemInterface[] = [
		this.navMenuItem,

		{ spacer: true },

		this.accountMenuItem,
		this.notificationsMenuItem
	];

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

			if (started) {
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

	toggleNavMenu(item:UIMenuItemInterface) {
		this.navOpen = !this.navOpen;
		this.accountOpen = false;
		this.notificationsOpen = false;

		this.adjustMenuIcons();
	}

	toggleAccountMenu() {
		this.accountOpen = !this.accountOpen;
		this.navOpen = false;
		this.notificationsOpen = false;

		this.adjustMenuIcons();
	}

	toggleNotificationMenu() {
		this.notificationsOpen = !this.notificationsOpen;
		this.navOpen = false;
		this.accountOpen = false;
		
		this.adjustMenuIcons();
	}

	private adjustMenuIcons() {
		this.navMenuItem.icon = this.navOpen ? "close" : "menu";
		this.accountMenuItem.icon = this.accountOpen ? "close" : "face";
		this.notificationsMenuItem.icon = this.notificationsOpen ? "close" : "notifications";
	}
}
