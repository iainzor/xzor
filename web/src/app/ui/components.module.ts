import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {XzorModule} from "../xzor/xzor.module";
import {DirectivesModule} from "./directives.module";
import {UIButtonModule} from "./ui-button/ui-button.module";
import {UICardComponent} from "./ui-card/ui-card.component";
import {UIHeaderComponent} from "./ui-header/ui-header.component";
import {UIIconComponent} from "./ui-icon/ui-icon.component";
import {UINavComponent} from "./ui-nav/ui-nav.component";
import {UISpinnerComponent} from "./ui-spinner/ui-spinner.component";

let COMPONENTS = [
	UICardComponent,
	UIHeaderComponent,
	UIIconComponent,
	UINavComponent,
	UISpinnerComponent
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		XzorModule,
		DirectivesModule,
		UIButtonModule
	],
	declarations: [
		...COMPONENTS
	],
	exports: [
		UIButtonModule,
		...COMPONENTS
	]
})
export class ComponentsModule
{

}