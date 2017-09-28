import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {TeamFormModule} from "../../teams/team-form/team-form.module";
import {TeamListModule} from "../../teams/team-list/team-list.module";
import {TeamsService} from "../../teams/teams.service";
import {TeamsResolver} from "../../teams/teams.resolver";
import {UIModule} from "../../ui/ui.module";

import {TeamsComponent} from "./teams.component";
import {IndexComponent} from "./index.component";
import {MyTeamsComponent} from "./my-teams.component";
import {NewComponent} from "./new.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ 
				path: "", 
				component: TeamsComponent,
				children: [
					{ 
						path: "", 
						component: IndexComponent, 
						resolve: { teams: TeamsResolver } 
					},
					{ 
						path: "my-teams", 
						component: MyTeamsComponent, 
						data: { myTeams: 1 }, 
						resolve: { teams: TeamsResolver } 
					},
					{ 
						path: "new", 
						component: NewComponent 
					}
				] 
			}
		]),
		TeamFormModule,
		TeamListModule,
		UIModule
	],
	declarations: [
		TeamsComponent,
		IndexComponent,
		MyTeamsComponent,
		NewComponent
	],
	providers: [
		TeamsService,
		TeamsResolver
	]
})
export class TeamsModule
{}