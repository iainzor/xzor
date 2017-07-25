import {Injectable, ErrorHandler} from "@angular/core";

import {AppService} from "./app.service";
import {NotificationsService} from "./notifications/notifications.service";

@Injectable()
export class AppErrorHandler implements ErrorHandler
{
	constructor(
		private App:AppService,
		private Notifications:NotificationsService
	) {}

	handleError(error:any) {
		this.App.setLoading(false);

		console.error(error);

		if (error.rejection) {
			this.notify(error.rejection);
		} else {
			this.notify({
				message: "An unknown error occurred"
			});
		}
	}

	private notify(error) {
		this.Notifications.push({
			title: "Error",
			message: error.message || "An unknown error occurred",
			theme: {
				background: "#f44336",
				text: "#fff"
			}
		});
	}
}