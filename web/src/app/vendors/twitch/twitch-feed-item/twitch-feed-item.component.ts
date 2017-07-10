import {Component, Input} from "@angular/core";

import {FeedItem} from "../../../feed/feed-item";
import {DataInterface} from "./data.interface";

@Component({
	selector: "twitch-feed-item",
	template: `
		{{item.title}}
	`
})
export class TwitchFeedItemComponent
{
	@Input() item:FeedItem<DataInterface>;
}