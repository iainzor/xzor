import {FeedItemInterface} from "./feed-item.interface";
import {FeedItem} from "./feed-item";
import {ProviderInterface} from "./provider.interface";

export class Feed
{
	private _results:FeedItem<any>[] = [];

	constructor(public providers:ProviderInterface[]) {
		providers.forEach((provider) => { 
			provider.active = true; 

			provider.results.forEach((item) => {
				this._results.push(
					new FeedItem<any>(provider, item)
				);
			});
		});
	}
	
	get results() : FeedItem<any>[] {
		return this._results.filter((result) => result.provider.active).sort((a, b) => {
			if (a.result.timestamp === b.result.timestamp) {
				return 0;
			} else {
				return a.result.timestamp > b.result.timestamp ? -1 : 1;
			}
		});
	}
}