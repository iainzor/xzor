import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {XzorModule} from "../xzor/xzor.module";
import {DirectivesModule} from "./directives.module";
import {UIButtonModule} from "./ui-button/ui-button.module";
import {UICardModule} from "./ui-card/ui-card.module";
import {UIColorPickerModule} from "./ui-color-picker/ui-color-picker.module";
import {UIControlsModule} from "./ui-controls/ui-controls.module";
import {UIFileSelectorModule} from "./ui-file-selector/ui-file-selector.module";
import {UIHeaderModule} from "./ui-header/ui-header.module";
import {UIIconModule} from "./ui-icon/ui-icon.module";
import {UINavModule} from "./ui-nav/ui-nav.module";
import {UIThemeEditorModule} from "./ui-theme-editor/ui-theme-editor.module";
import {UIToastModule} from "./ui-toast/ui-toast.module";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		XzorModule,
		DirectivesModule,

		UIButtonModule,
		UICardModule,
		UIColorPickerModule,
		UIControlsModule,
		UIFileSelectorModule,
		UIHeaderModule,
		UIIconModule,
		UINavModule,
		UIThemeEditorModule,
		UIToastModule
	],
	exports: [
		UIButtonModule,
		UICardModule,
		UIColorPickerModule,
		UIControlsModule,
		UIFileSelectorModule,
		UIHeaderModule,
		UIIconModule,
		UINavModule,
		UIThemeEditorModule,
		UIToastModule
	]
})
export class ComponentsModule
{

}