import {NgModule} from "@angular/core";
import {RouterModule, Router} from "@angular/router";

import {TeamFormModule} from "../../../teams/team-form/team-form.module";
import {TeamMembershipSettingsModule} from "../../../teams/team-membership-settings/team-membership-settings.module";
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
		TeamMembershipSettingsModule,
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