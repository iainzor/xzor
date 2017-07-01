import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

import {UIModule} from "../../ui/ui.module";
import {ImageUploaderModule} from "../../images/image-uploader/image-uploader.module";
import {GameImageEditorComponent} from "./game-image-editor.component";
import {GameImageModule} from "../game-image/game-image.module";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,

		ImageUploaderModule,
		UIModule,
		GameImageModule
	],
	declarations: [
		GameImageEditorComponent
	],
	exports: [
		GameImageEditorComponent
	]
})
export class GameImageEditorModule
{}