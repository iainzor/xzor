import {Injectable} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";

import {NotificationInterface} from "./notification.interface";

@Injectable()
export class NotificationsService
{
	private notifications:NotificationInterface[] = [];
	private notificationsSubject:BehaviorSubject<NotificationInterface[]> = new BehaviorSubject<NotificationInterface[]>(this.notifications);

	defaultLifetime:number = 3000;

	push(notification:NotificationInterface) {
		this.notifications.push(notification);
		this.notificationsSubject.next(this.notifications);

		let lifetime = notification.lifetime || this.defaultLifetime;
		setTimeout(() => {
			let index = this.notifications.indexOf(notification);
			if (index > -1) {
				this.notifications.splice(index, 1);
				this.notificationsSubject.next(this.notifications);
			}
		}, lifetime);
	}

	subscribe(onNext:(notifications:NotificationInterface[]) => void) : Subscription {
		return this.notificationsSubject.subscribe(onNext);
	}
}