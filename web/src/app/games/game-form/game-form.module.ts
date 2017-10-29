import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {UIModule} from "../../ui/ui.module";
import {XzorURLPickerModule} from "../../xzor/xzor-url-picker/xzor-url-picker.module";
import {GameImageEditorModule} from "../game-image-editor/game-image-editor.module";
import {GameFormComponent} from "./game-form.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		UIModule,
		
		GameImageEditorModule,

		XzorURLPickerModule
	],
	declarations: [
		GameFormComponent
	],
	exports: [
		GameFormComponent
	]
})
export class GameFormModule
{}