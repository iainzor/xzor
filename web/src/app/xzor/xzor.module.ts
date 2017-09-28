import { NgModule } from '@angular/core';

import {XzorLogoModule} from "./xzor-logo/xzor-logo.module";
import {XzorURLPickerModule} from "./xzor-url-picker/xzor-url-picker.module";

@NgModule({
	imports: [
		XzorLogoModule,
		XzorURLPickerModule
	],
	exports: [
		XzorLogoModule,
		XzorURLPickerModule
	]
})
export class XzorModule
{}