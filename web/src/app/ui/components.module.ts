import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {XzorModule} from "../xzor/xzor.module";
import {DirectivesModule} from "./directives.module";
import {UICardComponent} from "./ui-card/ui-card.component";
import {UINavComponent} from "./ui-nav/ui-nav.component";
import {UISpinnerComponent} from "./ui-spinner/ui-spinner.component";

let COMPONENTS = [
	UICardComponent,
	UINavComponent,
	UISpinnerComponent
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		XzorModule,
		DirectivesModule
	],
	declarations: [
		...COMPONENTS
	],
	exports: [
		...COMPONENTS
	]
})
export class ComponentsModule
{

}