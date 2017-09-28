import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Router, NavigationStart} from "@angular/router";
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
	private accountMenuItem = { title: "Account", hideTitle: true, icon: "face", onClick: this.toggleAccountMenu.bind(this) };
	private notificationsMenuItem = { title: "Notifications", hideTitle: true, icon: "notifications", onClick: this.toggleNotificationMenu.bind(this) };
	
	private routerSub:Subscription;

	@Input() account:AccountInterface;

	navOpen:boolean = false;
	accountOpen:boolean = false;
	notificationsOpen:boolean = false;

	menuItems:UIMenuItemInterface[] = [
		this.navMenuItem,

		{ spacer: true },

		this.accountMenuItem,
		this.notificationsMenuItem
	];

	constructor(private Router:Router) {}

	ngOnInit() {
		this.routerSub = this.Router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				this.navOpen = false;
				this.accountOpen = false;
				this.notificationsOpen = false;
				this.adjustMenuIcons();
			}
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

	onMenuOpenChange() {
		this.adjustMenuIcons();
	}

	private adjustMenuIcons() {
		this.navMenuItem.icon = this.navOpen ? "close" : "menu";
		this.accountMenuItem.icon = this.accountOpen ? "close" : "face";
		this.notificationsMenuItem.icon = this.notificationsOpen ? "close" : "notifications";
	}
}