import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {XzorURLPickerComponent} from "./xzor-url-picker.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
		XzorURLPickerComponent
	],
	exports: [
		XzorURLPickerComponent
	]
})
export class XzorURLPickerModule
{}