import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {UIModule} from "../ui/ui.module";

import {PlayersComponent} from "./players.component";

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: "", component: PlayersComponent }
		]),
		UIModule
	],
	declarations: [
		PlayersComponent
	]
})
export class PlayersModule
{}