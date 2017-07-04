import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {XzorModule} from "../xzor/xzor.module";
import {DirectivesModule} from "./directives.module";
import {UIButtonModule} from "./ui-button/ui-button.module";
import {UICardModule} from "./ui-card/ui-card.module";
import {UIColorPickerModule} from "./ui-color-picker/ui-color-picker.module";
import {UIControlsModule} from "./ui-controls/ui-controls.module";
import {UIHeaderComponent} from "./ui-header/ui-header.component";
import {UIIconComponent} from "./ui-icon/ui-icon.component";
import {UIFileSelectorModule} from "./ui-file-selector/ui-file-selector.module";
import {UIThemeEditorModule} from "./ui-theme-editor/ui-theme-editor.module";

let COMPONENTS = [
	UIHeaderComponent,
	UIIconComponent
];

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
		UIThemeEditorModule
	],
	declarations: [
		...COMPONENTS
	],
	exports: [
		UIButtonModule,
		UICardModule,
		UIColorPickerModule,
		UIControlsModule,
		UIFileSelectorModule,
		UIThemeEditorModule,
		
		...COMPONENTS
	]
})
export class ComponentsModule
{

}