import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {SourcesModule} from "../../sources/sources.module";
import {UIModule} from "../../ui/ui.module";

import {GameImporterModule} from "../game-importer/game-importer.module";
import {GameTileModule} from "../game-tile/game-tile.module";
import {GameSearchResponseComponent} from "./game-search-response.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		SourcesModule,
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