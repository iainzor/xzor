import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {DirectivesModule} from "./directives/directives.module";
import {UINavComponent} from "./ui-nav.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		DirectivesModule
	],
	declarations: [
		UINavComponent
	],
	exports: [
		DirectivesModule,

		UINavComponent
	]
})
export class UIModule
{}