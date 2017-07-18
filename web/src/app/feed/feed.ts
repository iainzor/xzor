import {FeedResponseInterface} from "./feed-response.interface";
import {FeedItemInterface} from "./feed-item.interface";
import {FeedItem} from "./feed-item";

export class Feed
{
	public results:FeedItem<any>[] = [];

	constructor(private response:FeedResponseInterface) {
		let results = [];
		
		response.providers.forEach((provider) => {
			let providerResults = response.results[provider.slug].map((result) => {
				return new FeedItem(provider, result);
			});
			results = results.concat(providerResults);
		});

		results.sort((a:FeedItem<any>, b:FeedItem<any>) => {
			if (a.timestamp === b.timestamp) {
				return 0;
			} else {
				return a.timestamp > b.timestamp ? -1 : 1;
			}
		});

		this.results = results;
	}
}