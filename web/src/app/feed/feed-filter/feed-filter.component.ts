import {Component, Input} from "@angular/core";

import {Feed} from "../feed";
import {FeedItem} from "../feed-item";
import {ProviderInterface} from "../provider.interface";

@Component({
	selector: "feed-filter",
	templateUrl: "./feed-filter.component.html",
	styleUrls: ["./feed-filter.component.css"]
})
export class FeedFilterComponent
{
	@Input() feed:Feed;

	toggleProvider(e:MouseEvent, provider:ProviderInterface) {
		e.preventDefault();
		provider.active = !provider.active;
		this.feed.generate();
	}
}