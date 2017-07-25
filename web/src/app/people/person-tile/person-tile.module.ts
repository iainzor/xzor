import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../../ui/ui.module";
import {PersonTileComponent} from "./person-tile.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule
	],
	declarations: [
		PersonTileComponent
	],
	exports: [
		PersonTileComponent
	]
})
export class PersonTileModule
{}