import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute, NavigationStart} from "@angular/router";
import {Subscription} from "rxjs";

import {AccountInterface} from "./account/account.interface";
import {UIMenuItemInterface} from "./ui/ui-menu/ui-menu-item.interface";

@Component({
	selector: "app-menu",
	templateUrl: "./app-menu.component.html",
	styleUrls: ["./app-menu.component.css"]
})
export class AppMenuComponent implements OnInit, OnDestroy
{
	private navMenuItem = { title: "Navigation", hideTitle: true, icon: "menu", onClick: this.toggleNavMenu.bind(this) };
	private signInMenuItem = { title: "Sign In", icon: "face", routerLink: ["/sign-in"], queryParams: {} };
	private notificationsMenuItem = { title: "Notifications", hideTitle: true, icon: "notifications", onClick: this.toggleNotificationMenu.bind(this) };
	
	private routerSub:Subscription;

	account:AccountInterface;
	navOpen:boolean = false;
	notificationsOpen:boolean = false;

	menuItems:UIMenuItemInterface[] = [
		this.navMenuItem,

		{ spacer: true },

		this.signInMenuItem,
		this.notificationsMenuItem
	];

	constructor(private Router:Router, private Route:ActivatedRoute) {}

	@Input("account") set _account(account:AccountInterface) {
		this.account = account;
		this.adjustMenu();
	}

	ngOnInit() {
		this.routerSub = this.Router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				this.navOpen = false;
				this.notificationsOpen = false;
			}
			this.adjustMenu();
		});
	}

	ngOnDestroy() {
		this.routerSub.unsubscribe();
	}

	ignoreDocumentClick(e:MouseEvent) {
		e.stopPropagation();
	}

	toggleNavMenu(item:UIMenuItemInterface) {
		this.navOpen = !this.navOpen;
		this.notificationsOpen = false;

		this.adjustMenu();
	}

	toggleAccountMenu() {
		this.navOpen = false;
		this.notificationsOpen = false;

		this.adjustMenu();
	}

	toggleNotificationMenu() {
		this.notificationsOpen = !this.notificationsOpen;
		this.navOpen = false;
		
		this.adjustMenu();
	}

	onMenuOpenChange() {
		this.adjustMenu();
	}

	private adjustMenu() {
		this.navMenuItem.icon = this.navOpen ? "close" : "menu";
		this.notificationsMenuItem.icon = this.notificationsOpen ? "close" : "notifications";
		this.signInMenuItem.queryParams = {
			redirectTo: this.Router.url
		};

		let items:any = [
			this.navMenuItem,
			{spacer: true}
		];

		if (!this.account || !this.account.isValid) {
			items.push(this.signInMenuItem);
		}

		items.push(this.notificationsMenuItem);

		this.menuItems = items;
	}
}