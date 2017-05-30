import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {SourceSearchModule} from "../../sources/source-search/source-search.module";
import {UIModule} from "../../ui/ui.module";

import {GameImporterModule} from "../game-importer/game-importer.module";
import {GameTileModule} from "../game-tile/game-tile.module";
import {GameSearchResponseComponent} from "./game-search-response.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		SourceSearchModule,
		UIModule,

		GameImporterModule,
		GameTileModule
	],
	declarations: [
		GameSearchResponseComponent
	],
	exports: [
		GameSearchResponseComponent
	]
})
export class GameSearchResponseModule
{}