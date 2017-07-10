import {NgModule} from "@angular/core";

import {FeedComponentsService} from "../../../feed/feed-components.service";
import {TwitchFeedItemComponent} from "./twitch-feed-item.component";

@NgModule({
	declarations: [
		TwitchFeedItemComponent
	],
	entryComponents: [
		TwitchFeedItemComponent
	],
	exports: [
		TwitchFeedItemComponent
	]
})
export class TwitchFeedItemModule
{
	constructor(
		FeedComponents:FeedComponentsService
	) {
		FeedComponents.register("twitch", TwitchFeedItemComponent);
	}
}