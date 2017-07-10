import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {FeedComponentsService} from "../../feed/feed-components.service";
import {TwitchFeedItemModule} from "./twitch-feed-item/twitch-feed-item.module";

@NgModule({
	imports: [
		TwitchFeedItemModule
	],
	exports: [
		TwitchFeedItemModule
	]
})
export class TwitchModule
{}
