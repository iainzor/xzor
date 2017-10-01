import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

@NgModule({
	imports: [
		RouterModule.forRoot([
			{ path: "sign-in", loadChildren: "./sign-in/sign-in.module#SignInModule" },
			{ path: "teams", loadChildren: "./teams/teams.module#TeamsModule" },
			{ path: "t/:slug", loadChildren: "./team/team.module#TeamModule" }
		])
	]
})
export class PagesModule
{}