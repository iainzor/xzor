import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {DashboardComponent} from "./dashboard.component";
import {DashboardFeedModule} from "../../dashboard/dashboard-feed/dashboard-feed.module";
import {GamesService} from "../../games/games.service";
import {GameService} from "../../games/game.service";
import {UIModule} from "../../ui/ui.module";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: "", component: DashboardComponent }
		]),

		DashboardFeedModule,
		UIModule
	],
	declarations: [
		DashboardComponent
	],
	providers: [
		GamesService,
		GameService
	]
})
export class DashboardModule
{}