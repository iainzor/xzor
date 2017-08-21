import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIModule} from "../../ui/ui.module";
import {GameComponentsModule} from "../game-components.module";
import {GameService} from "../game.service";
import {GameResolver} from "../game.resolver";
import {GameComponent} from "./game/game.component";
import {OverviewComponent} from "./game/overview.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ 
				path: "", 
				component: GameComponent, 
				resolve: { game: GameResolver },
				children: [
					{ path: "", component: OverviewComponent }
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
export class GamePagesModule
{}