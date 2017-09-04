import {animate, trigger, transition, sequence, state, style, stagger, query} from "@angular/animations";
import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {AppMenuService} from "../../app-menu.service";
import {AccountInterface} from "../../account/account.interface";
import {UIControlInterface} from "../../ui/ui-controls/ui-control.interface";

import {NotificationInterface} from "../notification.interface";
import {NotificationsService} from "../notifications.service";

@Component({
	selector: "notifications-menu",
	templateUrl: "./notifications-menu.component.html",
	styleUrls: ["./notifications-menu.component.css"],
	animations: []
})
export class NotificationsMenuComponent implements OnInit, OnDestroy
{
	private allSub:Subscription;

	all:NotificationInterface[] = [];

	@Input() account:AccountInterface;

	constructor(
		private Notifications:NotificationsService,
		private Menu:AppMenuService
	) {}

	ngOnInit() {
		this.allSub = this.Notifications.all.subscribe((all) => {
			this.all = all;
			this.Menu.component.badge = all.length ? all.length.toString() : null;
		})
	}

	ngOnDestroy() {
		this.allSub.unsubscribe();
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