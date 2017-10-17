import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIMenuComponent} from "./ui-menu.component";
import {UIIconModule} from "../ui-icon/ui-icon.module";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
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