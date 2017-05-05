import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../ui/ui.module";
import {XzorModule} from "../xzor/xzor.module";

import {SourceSearchModule} from "./source-search/source-search.module";
import {SourcesService} from "./sources.service";

@NgModule({
	imports: [
		CommonModule,
		
		UIModule,
		XzorModule,

		SourceSearchModule
	],
	exports: [
		SourceSearchModule
	]
})
export class SourcesModule
{}