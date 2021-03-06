import {animate, trigger, transition, style, state} from "@angular/animations";
import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {Router, NavigationStart} from "@angular/router";
import {Subscription} from "rxjs";

import {NotificationsService} from "./notifications/notifications.service";
import {NotificationInterface} from "./notifications/notification.interface";
import {AppService} from "./app.service";
import {AccountInterface} from "./account/account.interface";
import {AccountService} from "./account/account.service";

@Component({
	selector: "app-nav",
	templateUrl: "./app-nav.component.html",
	styleUrls: ["./app-nav.component.css"],
	animations: [
		trigger("navTrigger", [
			state("hidden", style({
				opacity: 0,
				transform: "translateX(-100%)"
			})),
			state("visible", style({
				opacity: 1,
				transform: "translateX(0)"
			})),
			transition("hidden <=> visible", animate(".2s ease-in-out"))
		])
	],
	host: {
		"[class.open]": "open"
	}
})
export class AppNavComponent
{
	@Input() account:AccountInterface;
	@Input() open:boolean = false;

	constructor(private Account:AccountService) {}

	signOut(e:MouseEvent) {
		e.preventDefault();

		this.Account.signOut();
	}
}