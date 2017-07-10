import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UIModule} from "../../../ui/ui.module";
import {RedditFeedItemComponent} from "./reddit-feed-item.component";

@NgModule({
	imports: [
		CommonModule,
		UIModule
	],
	declarations: [
		RedditFeedItemComponent
	],
	entryComponents: [
		RedditFeedItemComponent
	],
	exports: [
		RedditFeedItemComponent
	]
})
export class RedditFeedItemModule
{}