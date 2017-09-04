import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UIModule} from "../../ui/ui.module";

import {NotificationsToastComponent} from "./notifications-toast.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule
	],
	declarations: [
		NotificationsToastComponent
	],
	exports: [ 
		NotificationsToastComponent
	]
})
export class NotificationsToastModule
{}