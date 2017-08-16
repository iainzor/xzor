import {Injectable} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";

import {AccountService} from "../account/account.service";
import {ThemeInterface} from "../ui/theme.interface";
import {NotificationInterface} from "./notification.interface";

@Injectable()
export class NotificationsService
{
	private notifications:NotificationInterface[] = [];
	private notificationsSubject:BehaviorSubject<NotificationInterface[]> = new BehaviorSubject<NotificationInterface[]>(this.notifications);

	defaultLifetime:number = 3000;
	defaultTheme:ThemeInterface;

	constructor(private Account:AccountService) {
		Account.subscribe((account) => {
			this.defaultTheme = account.theme;
		});
	}

	push(notification:NotificationInterface) {
		if (!notification.theme) {
			notification.theme = this.defaultTheme;
		}
		if (!notification.lifetime) {
			notification.lifetime = this.defaultLifetime;
		}

		this.notifications.push(notification);
		this.notificationsSubject.next(this.notifications);

		setTimeout(() => {
			let index = this.notifications.indexOf(notification);
			if (index > -1) {
				this.notifications.splice(index, 1);
				this.notificationsSubject.next(this.notifications);
			}
		}, notification.lifetime);
	}

	subscribe(onNext:(notifications:NotificationInterface[]) => void) : Subscription {
		return this.notificationsSubject.subscribe(onNext);
	}
}