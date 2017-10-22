import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, ActivatedRoute} from "@angular/router";

import {PermissionsService} from "../../account/permissions.service";

import {TeamResolver} from "../../teams/team.resolver";
import {TeamService} from "../../teams/team.service";
import {TeamsService} from "../../teams/teams.service";

import {TeamMembersModule} from "../../teams/team-members/team-members.module";
import {UIModule} from "../../ui/ui.module";

import {TeamComponent} from "./team.component";
import {OverviewComponent} from "./overview.component";
import {JoinComponent} from "./join.component";

import {CanJoinTeam} from "./can-join-team";
import {CanManageTeam} from "./can-manage-team";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: "",
				component: TeamComponent,
				resolve: {
					team: TeamResolver
				},
				children: [
					{ path: "", component: OverviewComponent },
					{ path: "join", component: JoinComponent, canActivate: [CanJoinTeam] },
					{ path: "manage", loadChildren: "./admin/team-admin.module#TeamAdminModule", canActivate: [CanManageTeam] }
				]
			}
		]),
		TeamMembersModule,
		UIModule
	],
	declarations: [
		TeamComponent,
		OverviewComponent,
		JoinComponent
	],
	providers: [
		TeamsService,
		TeamService,
		TeamResolver,

		CanJoinTeam,
		CanManageTeam
	]
})
export class TeamModule
{}