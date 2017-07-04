import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {UIModule} from "../ui/ui.module";
import {SourceSearchModule} from "../sources/source-search/source-search.module";
import {SourcesService} from "../sources/sources.service";
import {GameComponentsModule} from "./game-components.module";
import {PageGamesComponent} from "./page-games/page-games.component";
import {PageAddGameComponent} from "./page-add-game/page-add-game.component";
import {GamesService} from "./games.service";
import {SourceGameResolver} from "./source-game.resolver";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{ path: "", component: PageGamesComponent },
			{ path: "add", component: PageAddGameComponent }
		]),

		GameComponentsModule,
		SourceSearchModule,
		UIModule
	],
	declarations: [
		PageGamesComponent,
		PageAddGameComponent
	],
	providers: [
		GamesService,
		SourcesService,
		SourceGameResolver
	]
})
export class GamesModule { }
