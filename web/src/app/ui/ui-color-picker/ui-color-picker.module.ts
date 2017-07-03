import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {UIColorPickerComponent} from "./ui-color-picker.component";

@NgModule({
	imports: [
		FormsModule
	],
	declarations: [
		UIColorPickerComponent
	],
	exports: [
		UIColorPickerComponent
	]
})
export class UIColorPickerModule
{}