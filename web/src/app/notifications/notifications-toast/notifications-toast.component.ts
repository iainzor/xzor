import {animate, trigger, transition, state, style, stagger, query} from "@angular/animations";
import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {NotificationInterface} from "../notification.interface";
import {NotificationsService} from "../notifications.service";

@Component({
	selector: "notifications-toast",
	templateUrl: "./notifications-toast.component.html",
	styleUrls: ["./notifications-toast.component.css"],
	host: {
		"[@toastTrigger]": "notifications.length"
	},
	animations: [
		trigger("toastTrigger", [
			transition("* => *", [
				query("ui-toast:enter", [
					style({
						opacity: 0
					}),
					stagger(50, animate(".2s ease-in-out", style({
						opacity: 1
					})))
				], { optional: true }),
				query("ui-toast:leave", [
					stagger(50, animate(".2s ease-in-out", style({
						opacity: 0
					})))
				], { optional: true })
			])
		])
	]
})
export class NotificationsToastComponent implements OnInit, OnDestroy
{
	private notificationsSub:Subscription;

	notifications:NotificationInterface[] = [];

	constructor(
		private Notifications:NotificationsService
	) {}

	ngOnInit() {
		this.notificationsSub = this.Notifications.all.subscribe((all) => {
			this.notifications = all.filter((n) => {
				return !n.isExpired;
			});
		});
	}

	ngOnDestroy() {
		this.notificationsSub.unsubscribe();
	}
}