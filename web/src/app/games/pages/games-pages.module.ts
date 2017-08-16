import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {UIModule} from "../../ui/ui.module";
import {GameComponentsModule} from "../game-components.module";
import {GamesComponent} from "./games/games.component";
import {AddComponent} from "./games/add.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: "", component: GamesComponent },
			{ path: "add", component: AddComponent }
		]),
		UIModule,
		GameComponentsModule
	],
	declarations: [
		GamesComponent,
		AddComponent
	]
})
export class GamesPagesModule
{}