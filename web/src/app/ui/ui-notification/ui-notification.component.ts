import {Component, Input} from "@angular/core";

import {NotificationInterface} from "../../notifications/notification.interface";

@Component({
	selector: "ui-notification",
	templateUrl: "./ui-notification.component.html",
	styleUrls: ["./ui-notification.component.css"]
})
export class UINotificationComponent
{
	@Input() notification:NotificationInterface;
}