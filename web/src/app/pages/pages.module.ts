import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

@NgModule({
	imports: [
		RouterModule.forRoot([
			{ path: "games", loadChildren: "./games/games.module#GamesModule" },
			{ path: "g/:slug", loadChildren: "./game/game.module#GameModule" },
			{ path: "sign-in", loadChildren: "./sign-in/sign-in.module#SignInModule" },
			{ path: "teams", loadChildren: "./teams/teams.module#TeamsModule" },
			{ path: "t/:slug", loadChildren: "./team/team.module#TeamModule" }
		])
	]
})
export class PagesModule
{}