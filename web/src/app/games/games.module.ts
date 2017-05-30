import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {UIModule} from "../ui/ui.module";
import {SourceSearchModule} from "../sources/source-search/source-search.module";
import {SourcesService} from "../sources/sources.service";
import {GameComponentsModule} from "./game-components.module";
import {GameSearchComponent} from "./game-search/game-search.component";
import {GameTileComponent} from "./game-tile/game-tile.component";
import {GamesComponent} from "./games.component";
import {GameComponent} from "./game.component";
import {GamesService} from "./games.service";
import {GameService} from "./game.service";
import {GameResolver} from "./game.resolver";
import {SourceGameResolver} from "./source-game.resolver";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{ path: "", component: GamesComponent },
			{ path: ":slug", component: GameComponent, resolve:
				{ game: GameResolver } 
			}
		]),

		GameComponentsModule,
		SourceSearchModule,
		UIModule
	],
	declarations: [
		GamesComponent,
		GameComponent
	],
	providers: [
		GamesService,
		GameService,
		SourcesService,
		GameResolver,
		SourceGameResolver
	]
})
export class GamesModule { }
