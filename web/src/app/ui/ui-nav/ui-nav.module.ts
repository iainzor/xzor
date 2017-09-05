import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIIconModule} from "../ui-icon/ui-icon.module";
import {UINavComponent} from "./ui-nav.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		UIIconModule
	],
	declarations: [
		UINavComponent
	],
	exports: [
		UINavComponent
	]
})
export class UINavModule
{}