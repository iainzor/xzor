import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIModule} from "../../ui/ui.module";
import {ForumsModule} from "../../forums/forums.module";
import {GameComponentsModule} from "../../games/game-components.module";
import {GameService} from "../../games/game.service";
import {GameResolver} from "../../games/game.resolver";
import {GameComponent} from "./game.component";
import {IndexComponent} from "./index.component";
import {ForumsComponent} from "./forums.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ 
				path: "", 
				component: GameComponent, 
				resolve: { game: GameResolver },
				children: [
					{ path: "", component: IndexComponent },
					{ path: "forums", component: ForumsComponent },
					{ path: "manage", loadChildren: "./admin/game-admin.module#GameAdminModule" }
				]
			}
		]),
		UIModule,
		ForumsModule,
		GameComponentsModule
	],
	declarations: [
		GameComponent,
		IndexComponent,
		ForumsComponent
	],
	providers: [
		GameService,
		GameResolver
	]
})
export class GameModule
{}