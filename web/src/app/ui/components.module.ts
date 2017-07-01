import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {XzorModule} from "../xzor/xzor.module";
import {DirectivesModule} from "./directives.module";
import {UIButtonModule} from "./ui-button/ui-button.module";
import {UICardModule} from "./ui-card/ui-card.module";
import {UIControlsModule} from "./ui-controls/ui-controls.module";
import {UIHeaderComponent} from "./ui-header/ui-header.component";
import {UIIconComponent} from "./ui-icon/ui-icon.component";
import {UIFileSelectorModule} from "./ui-file-selector/ui-file-selector.module";

let COMPONENTS = [
	UIHeaderComponent,
	UIIconComponent
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		XzorModule,
		DirectivesModule,

		UIButtonModule,
		UICardModule,
		UIControlsModule,
		UIFileSelectorModule
	],
	declarations: [
		...COMPONENTS
	],
	exports: [
		UIButtonModule,
		UICardModule,
		UIControlsModule,
		UIFileSelectorModule,
		
		...COMPONENTS
	]
})
export class ComponentsModule
{

}