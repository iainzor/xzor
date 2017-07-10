import {Component, Input} from "@angular/core";

import {Feed} from "../feed";
import {FeedItemInterface} from "../feed-item.interface";

@Component({
	selector: "feed-quilt",
	templateUrl: "./feed-quilt.component.html",
	styleUrls: ["./feed-quilt.component.css"]
})
export class FeedQuiltComponent
{
	@Input() feed:Feed;

	get results() : FeedItemInterface<any>[] {
		return this.feed ? this.feed.results() : [];
	}
}