import {Component, Input} from "@angular/core";

import {Feed} from "../feed";
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

		this.feed.toggleProvider(provider);
	}
}