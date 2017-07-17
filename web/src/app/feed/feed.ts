import {FeedResponseInterface} from "./feed-response.interface";
import {FeedItemInterface} from "./feed-item.interface";
import {FeedItem} from "./feed-item";

export class Feed
{
	constructor(private response:FeedResponseInterface) {}

	results() : FeedItem<any>[] {
		let results = [];
		
		this.response.providers.forEach((provider) => {
			let providerResults = this.response.results[provider.slug].map((result) => {
				return new FeedItem(provider, result);
			});
			results = results.concat(providerResults);
		});

		let sorted = results.sort((a:FeedItem<any>, b:FeedItem<any>) => {
			if (a.timestamp === b.timestamp) {
				return 0;
			} else {
				return a.timestamp > b.timestamp ? -1 : 1;
			}
		});

		return results;
	}
}