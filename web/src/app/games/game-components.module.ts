import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {UIModule} from "../ui/ui.module";
import {XzorModule} from "../xzor/xzor.module";

import {GameFeedModule} from "./game-feed/game-feed.module";
import {GameFormModule} from "./game-form/game-form.module";
import {GameImageEditorModule} from "./game-image-editor/game-image-editor.module";
import {GameListModule} from "./game-list/game-list.module";
import {GameSearchModule} from "./game-search/game-search.module";

import {GamesService} from "./games.service";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,

		UIModule,
		XzorModule,

		GameImageEditorModule,
		GameFeedModule,
		GameFormModule,
		GameListModule,
		GameSearchModule
	],
	exports: [
		GameImageEditorModule,
		GameFeedModule,
		GameFormModule,
		GameListModule,
		GameSearchModule
	],
	providers: [
		GamesService
	]
})
export class GameComponentsModule
{}