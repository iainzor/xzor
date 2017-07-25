import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UICardModule} from "../ui-card/ui-card.module";
import {DirectivesModule} from "../directives.module";
import {UINotificationComponent} from "./ui-notification.component";

@NgModule({
	imports: [
		CommonModule,
		DirectivesModule,
		UICardModule
	],
	declarations: [
		UINotificationComponent
	],
	exports: [
		UINotificationComponent
	]
})
export class UINotificationModule
{}