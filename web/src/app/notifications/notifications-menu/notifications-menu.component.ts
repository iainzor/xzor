import {animate, trigger, transition, sequence, state, style, stagger, query} from "@angular/animations";
import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {AccountInterface} from "../../account/account.interface";
import {UIControlInterface} from "../../ui/ui-controls/ui-control.interface";

import {NotificationInterface} from "../notification.interface";
import {NotificationsService} from "../notifications.service";

@Component({
	selector: "notifications-menu",
	templateUrl: "./notifications-menu.component.html",
	styleUrls: ["./notifications-menu.component.css"],
	animations: [
		trigger("slide", [
			transition(":enter", [
				style({
					opacity: 0,
					transform: "translateX(100%)"
				}),
				animate(".2s ease-in-out", style({
					opacity: 1,
					transform: "translateX(0)"
				}))
			]),
			transition(":leave", [
				animate(".2s ease-in-out", style({
					opacity: 0,
					transform: "translateX(100%)"
				}))
			])
		])
	]
})
export class NotificationsMenuComponent implements OnInit, OnDestroy
{
	private allSub:Subscription;

	all:NotificationInterface[] = [];
	active:NotificationInterface[] = [];
	open:boolean = false;

	@Input() account:AccountInterface;

	@Input("open") set _open(open:boolean) {
		this.open = open;
		this.generateActive();
	};
	@Output() openChange:EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(
		private Notifications:NotificationsService
	) {}

	ngOnInit() {
		this.allSub = this.Notifications.all.subscribe((all) => {
			this.all = all;
			this.generateActive();
		});
	}

	ngOnDestroy() {
		this.allSub.unsubscribe();
	}

	generateActive() {
		this.active = this.all.filter((item) => {
			if (this.open) {
				return true;
			} else {
				return !item.isExpired;
			}
		});
	}

	messageControls(notification:NotificationInterface) {
		return [
			{
				icon: "close",
				action: () => {
					this.Notifications.remove(notification);
				}
			}
		];
	};
}