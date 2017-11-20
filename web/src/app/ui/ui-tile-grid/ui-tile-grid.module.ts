import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UITileGridComponent} from "./ui-tile-grid.component";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		UITileGridComponent
	],
	exports: [
		UITileGridComponent
	]
})
export class UITileGridModule
{}