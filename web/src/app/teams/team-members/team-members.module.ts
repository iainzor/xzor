import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {TeamMembersComponent} from "./team-members.component";
import {UIModule} from "../../ui/ui.module";

@NgModule({
	imports: [
		CommonModule,
		UIModule
	],
	declarations: [
		TeamMembersComponent
	],
	exports: [
		TeamMembersComponent
	]
})
export class TeamMembersModule
{}