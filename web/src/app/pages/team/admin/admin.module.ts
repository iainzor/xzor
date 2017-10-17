import {NgModule} from "@angular/core";
import {RouterModule, Router} from "@angular/router";

import {TeamFormModule} from "../../../teams/team-form/team-form.module";
import {TeamSettingsFormModule} from "../../../teams/team-settings-form/team-settings-form.module";
import {UIModule} from "../../../ui/ui.module";

import {AdminComponent} from "./admin.component";
import {IndexComponent} from "./index.component";
import {MembersComponent} from "./members.component";

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: "",
				component: AdminComponent,
				children: [
					{ path: "", component: IndexComponent },
					{ path: "members", component: MembersComponent }
				]
			}
		]),
		TeamFormModule,
		TeamSettingsFormModule,
		UIModule
	],
	declarations: [
		AdminComponent,
		IndexComponent,
		MembersComponent
	]
})
export class AdminModule
{}