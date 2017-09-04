import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject, Subscription} from "rxjs";

import {AccountService} from "../account/account.service";
import {ThemeInterface} from "../ui/theme.interface";
import {NotificationInterface} from "./notification.interface";

@Injectable()
export class NotificationsService
{
	private _all:NotificationInterface[] = [];

	defaultLifetime:number = 3000;
	defaultTheme:ThemeInterface;

	all:BehaviorSubject<NotificationInterface[]> = new BehaviorSubject<NotificationInterface[]>(this._all);

	constructor(private Account:AccountService) {
		Account.subscribe((account) => {
			this.defaultTheme = account.theme;
		});
	}

	setAll(notifications:NotificationInterface[]) {
		this._all = [];
		notifications.forEach((n) => {
			this.push(n);
		});
	}

	push(notification:NotificationInterface) {
		if (!notification.theme) {
			notification.theme = this.defaultTheme;
		}
		if (!notification.lifetime) {
			notification.lifetime = this.defaultLifetime;
		}
		if (!notification.created) {
			notification.created = new Date();
		}

		this._all.push(notification);
		this._all.sort(this.sorter.bind(this));
		this.all.next(this._all);

		setTimeout(() => {
			notification.isExpired = true;
			this.all.next(this._all);
		}, notification.lifetime);
	}

	remove(notification:NotificationInterface) {
		let index = this._all.indexOf(notification);
		if (index > -1) {
			this._all.splice(index, 1);

			setTimeout(() => {
				this.all.next(this._all);
			});
		}
	}

	sorter(a:NotificationInterface, b:NotificationInterface) : number {
		if (a.created === b.created) {
			return 0;
		} else {
			return a.created > b.created ? -1 : 1;
		}
	}
}