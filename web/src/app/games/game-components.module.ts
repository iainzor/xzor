import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {SourcesModule} from "../sources/sources.module";
import {UIModule} from "../ui/ui.module";
import {XzorModule} from "../xzor/xzor.module";

import {GameContainerModule} from "./game-container/game-container.module";
import {GameTileModule} from "./game-tile/game-tile.module";

import {GameSearchComponent} from "./game-search/game-search.component";
import {GameSearchResponseComponent} from "./game-search-response/game-search-response.component";
import {GamesService} from "./games.service";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,

		SourcesModule,
		UIModule,
		XzorModule,

		GameContainerModule,
		GameTileModule
	],
	declarations: [
		GameSearchComponent,
		GameSearchResponseComponent
	],
	exports: [
		GameSearchComponent,
		GameSearchResponseComponent,

		GameContainerModule,
		GameTileModule
	],
	providers: [
		GamesService
	]
})
export class GameComponentsModule
{}