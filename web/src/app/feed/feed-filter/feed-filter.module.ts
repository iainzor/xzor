import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../../ui/ui.module";
import {FeedFilterComponent} from "./feed-filter.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule
	],
	declarations: [
		FeedFilterComponent
	],
	exports: [
		FeedFilterComponent
	]
})
export class FeedFilterModule
{}