import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {UIModule} from "../ui/ui.module";

import {GamesComponent} from "./games.component";
import {GameComponent} from "./game.component";
import {GameTileComponent} from "./game-tile/game-tile.component";

import {GamesService} from "./games.service";
import {GameService} from "./game.service";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([{ 
			path: "", children: [
				{ path: "", component: GamesComponent },
				{ path: ":slug", component: GameComponent }
			]
		}]),

		UIModule
	],
	declarations: [
		GamesComponent,
		GameComponent,
		GameTileComponent
	],
	providers: [
		GamesService
	]
})
export class GamesModule { }
