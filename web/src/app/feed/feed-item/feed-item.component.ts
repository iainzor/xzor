import {Component, Input} from "@angular/core";

import {FeedItem} from "../feed-item";

@Component({
	selector: "feed-item",
	templateUrl: "./feed-item.component.html",
	styleUrls: ["./feed-item.component.css"]
})
export class FeedItemComponent
{
	@Input() item:FeedItem<any>;
}