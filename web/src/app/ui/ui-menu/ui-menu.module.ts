import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIMenuComponent} from "./ui-menu.component";
import {UIIconModule} from "../ui-icon/ui-icon.module";
import {DirectivesModule} from "../directives.module";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		DirectivesModule,
		UIIconModule
	],
	declarations: [
		UIMenuComponent
	],
	exports: [
		UIMenuComponent
	]
})
export class UIMenuModule
{

}