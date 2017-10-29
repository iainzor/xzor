import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {TeamListComponent} from "./team-list.component";
import {UIModule} from "../../ui/ui.module";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		UIModule
	],
	declarations: [
		TeamListComponent
	],
	exports: [
		TeamListComponent
	]
})
export class TeamListModule
{}