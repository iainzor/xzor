import {animate, trigger, transition, style, state} from "@angular/animations";
import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {Router, NavigationStart} from "@angular/router";
import {Subscription} from "rxjs";

import {NotificationsService} from "./notifications/notifications.service";
import {NotificationInterface} from "./notifications/notification.interface";
import {AppService} from "./app.service";
import {AccountInterface} from "./account/account.interface";

@Component({
	selector: "app-nav",
	templateUrl: "./app-nav.component.html",
	styleUrls: ["./app-nav.component.css"],
	animations: [
		trigger("menu", [
			transition(":enter", [
				style({
					opacity: 0,
					transform: "translateX(-30px)"
				}),
				animate(".1s ease-in-out", style({
					opacity: 1,
					transform: "none"
				}))
			]),
			transition(":leave", [
				animate(".1s ease-in-out", style({
					opacity: 0,
					transform: "translateX(-30px)"
				}))
			])
		])
	],
	host: {
		"[class.open]": "isOpen",
		"(click)": "interceptClick($event)"
	}
})
export class AppNavComponent implements OnInit, OnDestroy, EventListenerObject
{
	private routerSub:Subscription;

	@Input() account:AccountInterface;
	
	isOpen:boolean = false;

	constructor(
		private Router:Router
	) {}

	ngOnInit() {
		this.routerSub = this.Router.events.subscribe((e) => {
			if (e instanceof NavigationStart) {
				this.isOpen = false;
			}
		});

		document.addEventListener("click", this);
	}

	ngOnDestroy() {
		this.routerSub.unsubscribe();

		document.removeEventListener("click", this);
	}

	toggle(e:MouseEvent) {
		e.preventDefault();
		this.isOpen = !this.isOpen;
	}

	handleEvent(e:Event) {
		this.isOpen = false;
	}

	interceptClick(e:Event) {
		e.stopPropagation();
	}
}