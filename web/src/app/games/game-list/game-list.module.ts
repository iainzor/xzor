import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {GameListComponent} from "./game-list.component";
import {UITileGridModule} from "../../ui/ui-tile-grid/ui-tile-grid.module";
import {UITileModule} from "../../ui/ui-tile/ui-tile.module"

@NgModule({
	imports: [
		CommonModule,
		UITileGridModule,
		UITileModule
	],
	declarations: [
		GameListComponent
	],
	exports: [
		GameListComponent
	]
})
export class GameListModule
{}