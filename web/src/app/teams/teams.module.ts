import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {UIModule} from "../ui/ui.module";

import {TeamsComponent} from "./teams.component";

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: "", component: TeamsComponent }
		]),
		UIModule
	],
	declarations: [
		TeamsComponent
	]
})
export class TeamsModule
{}