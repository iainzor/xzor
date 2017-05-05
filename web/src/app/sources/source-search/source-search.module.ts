import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../../ui/ui.module";
import {XzorModule} from "../../xzor/xzor.module";

import {SourceSearchComponent} from "./source-search.component";

@NgModule({
	imports: [
		CommonModule,
		
		UIModule,
		XzorModule
	],
	declarations: [
		SourceSearchComponent
	],
	exports: [
		SourceSearchComponent
	]
})
export class SourceSearchModule
{}