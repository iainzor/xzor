import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {UIColorPickerModule} from "../ui-color-picker/ui-color-picker.module";
import {UIThemeEditorComponent} from "./ui-theme-editor.component";

@NgModule({
	imports: [
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