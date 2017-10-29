import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {DirectivesModule} from "../directives.module";
import {UITileComponent} from "./ui-tile.component";
import {UICardModule} from "../ui-card/ui-card.module";
import {UIImageModule} from "../ui-image/ui-image.module"

@NgModule({
	imports: [
		CommonModule,
		DirectivesModule,
		RouterModule,
		
		UICardModule,
		UIImageModule
	],
	declarations: [
		UITileComponent
	],
	exports: [
		UITileComponent
	]
})
export class UITileModule
{

}