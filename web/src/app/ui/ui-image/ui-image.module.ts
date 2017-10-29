import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIImageComponent} from "./ui-image.component";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		UIImageComponent
	],
	exports: [
		UIImageComponent
	]
})
export class UIImageModule
{}