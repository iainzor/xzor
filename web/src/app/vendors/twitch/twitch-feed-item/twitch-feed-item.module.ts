import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {FeedComponentsService} from "../../../feed/feed-components.service";
import {TwitchFeedItemComponent} from "./twitch-feed-item.component";

@NgModule({
	imports: [
		CommonModule
	],
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