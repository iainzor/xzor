import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIModule} from "../../ui/ui.module";
import {GameComponentsModule} from "../../games/game-components.module";
import {GameService} from "../../games/game.service";
import {GameResolver} from "../../games/game.resolver";
import {GameComponent} from "./game.component";
import {OverviewComponent} from "./overview.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ 
				path: "", 
				component: GameComponent, 
				resolve: { game: GameResolver },
				children: [
					{ path: "", component: OverviewComponent },
					{ path: "manage", loadChildren: "./admin/game-admin.module#GameAdminModule" }
				]
			}
		]),
		UIModule,
		GameComponentsModule
	],
	declarations: [
		GameComponent,
		OverviewComponent
	],
	providers: [
		GameService,
		GameResolver
	]
})
export class GameModule
{}