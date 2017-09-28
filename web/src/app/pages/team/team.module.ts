import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, ActivatedRoute} from "@angular/router";

import {PermissionsService} from "../../account/permissions.service";

import {TeamResolver} from "../../teams/team.resolver";
import {TeamPermissionsResolver} from "../../teams/team-permissions.resolver";
import {TeamService} from "../../teams/team.service";
import {TeamsService} from "../../teams/teams.service";

import {TeamMembersModule} from "../../teams/team-members/team-members.module";
import {UIModule} from "../../ui/ui.module";

import {TeamComponent} from "./team.component";
import {OverviewComponent} from "./overview.component";

import {CanActivateAdminService} from "./can-activate-admin.service";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: "",
				component: TeamComponent,
				resolve: {
					team: TeamResolver,
					permissions: TeamPermissionsResolver
				},
				children: [
					{ path: "", component: OverviewComponent },
					{ path: "manage", loadChildren: "./admin/admin.module#AdminModule", canActivate: [CanActivateAdminService] }
				]
			}
		]),
		TeamMembersModule,
		UIModule
	],
	declarations: [
		TeamComponent,
		OverviewComponent
	],
	providers: [
		TeamsService,
		TeamService,
		TeamResolver,
		TeamPermissionsResolver,

		CanActivateAdminService
	]
})
export class TeamModule
{}