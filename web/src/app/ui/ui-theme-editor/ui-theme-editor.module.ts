import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {UIColorPickerModule} from "../ui-color-picker/ui-color-picker.module";
import {UIThemeEditorComponent} from "./ui-theme-editor.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		UIColorPickerModule
	],
	declarations: [
		UIThemeEditorComponent
	],
	exports: [
		UIThemeEditorComponent
	]
})
export class UIThemeEditorModule
{}