import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {DirectivesModule} from "./directives.module";
import {ComponentsModule} from "./components.module";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		ComponentsModule,
		DirectivesModule
	],
	exports: [
		ComponentsModule,
		DirectivesModule
	]
})
export class UIModule
{}