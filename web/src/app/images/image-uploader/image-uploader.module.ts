import {NgModule} from "@angular/core";

import {UIFileSelectorModule} from "../../ui/ui-file-selector/ui-file-selector.module";
import {XzorLogoModule} from "../../xzor/xzor-logo/xzor-logo.module";
import {ImageUploaderComponent} from "./image-uploader.component";

@NgModule({
	imports: [
		UIFileSelectorModule,
		XzorLogoModule
	],
	declarations: [
		ImageUploaderComponent
	],
	exports: [
		ImageUploaderComponent
	]
})
export class ImageUploaderModule
{}