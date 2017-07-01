import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {DirectivesModule} from "../directives.module";
import {UICardModule} from "../ui-card/ui-card.module";
import {UIFileSelectorComponent} from "./ui-file-selector.component";

@NgModule({
	imports: [
		CommonModule,
		
		DirectivesModule,
		UICardModule
	],
	declarations: [
		UIFileSelectorComponent
	],
	exports: [
		UIFileSelectorComponent
	]
})
export class UIFileSelectorModule
{}