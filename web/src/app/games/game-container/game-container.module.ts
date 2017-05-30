import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIModule} from "../../ui/ui.module";
import {GameImageModule} from "../game-image/game-image.module";
import {GameTileModule} from "../game-tile/game-tile.module";
import {GameContainerComponent} from "./game-container.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		GameImageModule,
		GameTileModule,
		UIModule
	],
	declarations: [
		GameContainerComponent
	],
	exports: [
		GameContainerComponent
	]
})
export class GameContainerModule
{}