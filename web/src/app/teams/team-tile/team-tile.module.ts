import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../../ui/ui.module";
import {TeamTileComponent} from "./team-tile.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule
	],
	declarations: [
		TeamTileComponent
	],
	exports: [
		TeamTileComponent
	]
})
export class TeamTileModule
{}