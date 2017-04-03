import {NgModule} from "@angular/core";

import {GoogleModule} from "./google/google.module";

@NgModule({
	imports: [
		GoogleModule
	],
	exports: [
		GoogleModule
	]
})
export class VendorsModule
{}