import {Component, Input} from "@angular/core";

import {FeedItem} from "../../../feed/feed-item";
import {DataInterface} from "./data.interface";

@Component({
	selector: "reddit-feed-item",
	templateUrl: "./reddit-feed-item.component.html",
	styleUrls: ["./reddit-feed-item.component.css"]
})
export class RedditFeedItemComponent
{
	@Input() item:FeedItem<DataInterface>;

	get backgroundStyles() : any {
		if (this.item && this.item.result.data["thumbnail"]) {
			return {
				backgroundImage: "url('"+ this.item.result.data["thumbnail"] +"')"
			};
		}
		return {};
	}
}