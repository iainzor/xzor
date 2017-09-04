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
	feed:Feed;
	items:FeedItem<any>[] = [];
	providers:ProviderInterface[] = [];

	@Input("feed") set _feed(feed:Feed) {
		this.feed = feed;

		if (feed) {
			this.providers = feed.providers.filter((provider) => provider.results.length > 0);
		}
	}

	toggleProvider(e:MouseEvent, provider:ProviderInterface) {
		e.preventDefault();
		provider.active = !provider.active;
	}
}