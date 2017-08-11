import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../../ui/ui.module";
import {GameFollowModule} from "../game-follow/game-follow.module";
import {GameImageModule} from "../game-image/game-image.module";
import {GameTileComponent} from "./game-tile.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule,
		GameFollowModule,
		GameImageModule
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