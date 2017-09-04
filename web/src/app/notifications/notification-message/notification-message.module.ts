import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UIModule} from "../../ui/ui.module";
import {NotificationMessageComponent} from "./notification-message.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule
	],
	declarations: [
		NotificationMessageComponent
	],
	exports: [
		NotificationMessageComponent
	]
})
export class NotificationMessageModule
{
	
}