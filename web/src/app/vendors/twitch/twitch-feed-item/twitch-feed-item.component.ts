import {Component, Input} from "@angular/core";

import {FeedItem} from "../../../feed/feed-item";
import {DataInterface} from "./data.interface";

@Component({
	selector: "twitch-feed-item",
	templateUrl: "./twitch-feed-item.component.html",
	styleUrls: ["./twitch-feed-item.component.css"]
})
export class TwitchFeedItemComponent
{
	@Input() item:FeedItem<DataInterface>;

	get backgroundStyles() : any {
		if (!this.item) { 
			return {}; 
		}

		return {
			"background-image": "url("+ this.item.result.data.preview.large +")"
		};
	}
}