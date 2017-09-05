import {Component, Input} from "@angular/core";
import {UIControlInterface} from "../../ui/ui-controls/ui-control.interface";
import {NotificationInterface} from "../notification.interface";

@Component({
	selector: "notification-message",
	templateUrl: "./notification-message.component.html",
	styleUrls: ["./notification-message.component.css"]
})
export class NotificationMessageComponent
{
	@Input() notification:NotificationInterface;
	@Input() controls:UIControlInterface[] = [];
}