/*
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {UIModule} from "../ui/ui.module";
import {SourcesService} from "../sources/sources.service";
import {PageGameComponent} from "./page-game/page-game.component";
import {GameService} from "./game.service";
import {GameResolver} from "./game.resolver";
import {GameComponentsModule} from "./game-components.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{ path: "", component: PageGameComponent, resolve:
				{ game: GameResolver } 
			}
		]),
		UIModule,
		GameComponentsModule
	],
	declarations: [
		PageGameComponent
	],
	providers: [
		GameResolver,
		GameService,
		SourcesService
	]
})
export class GameModule
{}
*/