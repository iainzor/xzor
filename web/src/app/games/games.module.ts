import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {UIModule} from "../ui/ui.module";
import {SourcesModule} from "../sources/sources.module";
import {SourcesService} from "../sources/sources.service";
import {GameComponentsModule} from "./game-components.module";

import {GameSearchComponent} from "./game-search/game-search.component";
import {GameTileComponent} from "./game-tile/game-tile.component";

import {GamesComponent} from "./games.component";
import {GameComponent} from "./game.component";
import {ImportComponent} from "./import.component";

import {GamesService} from "./games.service";
import {GameService} from "./game.service";
import {SourceGameResolver} from "./source-game.resolver";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{ path: "", component: GamesComponent },
			{ path: ":slug", component: GameComponent },
			{ path: "import/:source/:sourceId", component: ImportComponent, resolve: 
				{ game: SourceGameResolver } 
			}
		]),

		GameComponentsModule,
		SourcesModule,
		UIModule
	],
	declarations: [
		GamesComponent,
		GameComponent,
		ImportComponent
	],
	providers: [
		GamesService,
		SourcesService,
		SourceGameResolver
	]
})
export class GamesModule { }
