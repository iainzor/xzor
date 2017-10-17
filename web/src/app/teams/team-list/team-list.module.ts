import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {TeamTileModule} from "../team-tile/team-tile.module";
import {TeamListComponent} from "./team-list.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		TeamTileModule
	],
	declarations: [
		TeamListComponent
	],
	exports: [
		TeamListComponent
	]
})
export class TeamListModule
{}