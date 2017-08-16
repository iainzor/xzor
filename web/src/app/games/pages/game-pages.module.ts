import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIModule} from "../../ui/ui.module";
import {GameComponentsModule} from "../game-components.module";
import {GameService} from "../game.service";
import {GameResolver} from "../game.resolver";
import {GameComponent} from "./game/game.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: "", component: GameComponent, resolve: { game: GameResolver } }
		]),
		UIModule,
		GameComponentsModule
	],
	declarations: [
		GameComponent
	],
	providers: [
		GameService,
		GameResolver
	]
})
export class GamePagesModule
{}