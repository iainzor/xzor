import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../ui/ui.module";
import {XzorModule} from "../xzor/xzor.module";
import {SourcesService} from "./sources.service";
import {SourcesSearchComponent} from "./sources-search/sources-search.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule,
		XzorModule
	],
	declarations: [
		SourcesSearchComponent
	],
	exports: [
		SourcesSearchComponent
	],
	providers: [
		SourcesService
	]
})
export class SourcesModule
{}