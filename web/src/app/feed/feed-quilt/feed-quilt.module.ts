import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../../ui/ui.module";
import {FeedItemModule} from "../feed-item/feed-item.module";
import {FeedQuiltComponent} from "./feed-quilt.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule,
		FeedItemModule
	],
	declarations: [
		FeedQuiltComponent
	],
	exports: [
		FeedQuiltComponent
	]
})
export class FeedQuiltModule
{}