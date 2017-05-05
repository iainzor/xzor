import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../../ui/ui.module";
import {GameTileComponent} from "./game-tile.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule
	],
	declarations: [
		GameTileComponent
	],
	exports: [
		GameTileComponent
	]
})
export class GameTileModule
{}