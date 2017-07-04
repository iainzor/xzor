import { NgModule } from '@angular/core';

import {XzorLogoModule} from "./xzor-logo/xzor-logo.module";

@NgModule({
	imports: [
		XzorLogoModule
	],
	exports: [
		XzorLogoModule
	]
})
export class XzorModule
{}