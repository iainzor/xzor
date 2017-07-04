import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {DirectivesModule} from "../directives.module";
import {UIControlsComponent} from "./ui-controls.component";
import {UIControlComponent} from "./ui-control.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		
		DirectivesModule
	],
	declarations: [
		UIControlsComponent,
		UIControlComponent
	],
	exports: [
		UIControlsComponent
	]
})
export class UIControlsModule
{}