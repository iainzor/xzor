import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {SourcesModule} from "../sources/sources.module";
import {UIModule} from "../ui/ui.module";
import {XzorModule} from "../xzor/xzor.module";

import {GameContainerModule} from "./game-container/game-container.module";
import {GameImageModule} from "./game-image/game-image.module";
import {GameImageEditorModule} from "./game-image-editor/game-image-editor.module";
import {GameImporterModule} from "./game-importer/game-importer.module";
import {GameSearchModule} from "./game-search/game-search.module";
import {GameSearchResponseModule} from "./game-search-response/game-search-response.module";
import {GameTileModule} from "./game-tile/game-tile.module";

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
		GameImageModule,
		GameImageEditorModule,
		GameImporterModule,
		GameSearchModule,
		GameSearchResponseModule,
		GameTileModule
	],
	exports: [
		GameContainerModule,
		GameImageModule,
		GameImageEditorModule,
		GameImporterModule,
		GameSearchModule,
		GameSearchResponseModule,
		GameTileModule
	],
	providers: [
		GamesService
	]
})
export class GameComponentsModule
{}