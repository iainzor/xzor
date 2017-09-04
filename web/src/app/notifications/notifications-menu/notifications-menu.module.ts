import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UIModule} from "../../ui/ui.module";
import {NotificationMessageModule} from "../notification-message/notification-message.module";
import {NotificationsMenuComponent} from "./notifications-menu.component";

@NgModule({
	imports: [
		CommonModule,
		NotificationMessageModule,
		UIModule
	],
	declarations: [
		NotificationsMenuComponent
	],
	exports: [
		NotificationsMenuComponent
	]
})
export class NotificationsMenuModule
{}