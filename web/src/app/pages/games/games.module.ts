import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIModule} from "../../ui/ui.module";
import {GameComponentsModule} from "../../games/game-components.module";
import {GamesComponent} from "./games.component";
import {AddComponent} from "./add.component";
import {AllComponent} from "./all.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ 
				path: "", 
				component: GamesComponent,
				children: [
					{ path: "", component: AllComponent },
					{ path: "add", component: AddComponent }
				] 
			}
		]),
		UIModule,
		GameComponentsModule
	],
	declarations: [
		GamesComponent,
		AddComponent,
		AllComponent
	]
})
export class GamesModule
{}