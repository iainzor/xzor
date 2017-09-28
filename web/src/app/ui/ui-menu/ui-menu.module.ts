import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIMenuComponent} from "./ui-menu.component";
import {UIIconModule} from "../ui-icon/ui-icon.module";

@NgModule({
	imports: [
		CommonModule,
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