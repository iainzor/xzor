import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIButtonComponent} from "./ui-button.component";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		UIButtonComponent
	],
	exports: [
		UIButtonComponent
	]
})
export class UIButtonModule
{}