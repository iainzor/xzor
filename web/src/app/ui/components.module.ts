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
import {UIImageModule} from "./ui-image/ui-image.module";
import {UIMenuModule} from "./ui-menu/ui-menu.module";
import {UINavModule} from "./ui-nav/ui-nav.module";
import {UIThemeEditorModule} from "./ui-theme-editor/ui-theme-editor.module";
import {UITileModule} from "./ui-tile/ui-tile.module";
import {UITileGridModule} from "./ui-tile-grid/ui-tile-grid.module";

let EXPORTABLES = [
	UIButtonModule,
	UICardModule,
	UIColorPickerModule,
	UIControlsModule,
	UIFileSelectorModule,
	UIHeaderModule,
	UIIconModule,
	UIImageModule,
	UIMenuModule,
	UINavModule,
	UIThemeEditorModule,
	UITileGridModule,
	UITileModule
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		XzorModule,
		DirectivesModule,

		...EXPORTABLES
	],
	exports: EXPORTABLES
})
export class ComponentsModule
{

}