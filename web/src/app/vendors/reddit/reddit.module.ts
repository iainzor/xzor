import {NgModule} from "@angular/core";

import {FeedComponentsService} from "../../feed/feed-components.service";
import {RedditFeedItemModule} from "./reddit-feed-item/reddit-feed-item.module";
import {RedditFeedItemComponent} from "./reddit-feed-item/reddit-feed-item.component";

@NgModule({
	imports: [
		RedditFeedItemModule
	],
	exports: [
		RedditFeedItemModule
	]
})
export class RedditModule
{
	constructor(
		private FeedComponents:FeedComponentsService
	) {
		FeedComponents.register("reddit", RedditFeedItemComponent);
	}
}