import {FeedItemInterface} from "./feed-item.interface";
import {FeedItem} from "./feed-item";
import {ProviderInterface} from "./provider.interface";

export class Feed
{
	private _results:FeedItem<any>[] = [];

	constructor(public providers:ProviderInterface[]) {
		providers.forEach((provider) => { 
			provider.active = true; 
		});

		this.generateResults();
	}

	get isEmpty() : boolean {
		return this._results.length === 0;
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

	generateResults() {
		this._results = [];

		this.providers.forEach((provider) => {
			provider.results.forEach((item) => {
				this._results.push(
					new FeedItem<any>(provider, item)
				);
			});
		});
	}

	merge(feed:Feed) {
		feed.providers.forEach((providerA) => {
			let providerFound = false;

			this.providers.forEach((providerB) => {
				if (providerA.name === providerB.name) {
					providerFound = true;

					providerA.results.forEach((itemA) => {
						let itemFound = false;

						providerB.results.forEach((itemB) => {
							if (itemA.key === itemB.key) {
								itemFound = true;
							}
						});

						if (!itemFound) {
							providerB.results.push(itemA);
						}
					});
				}
			});

			if (!providerFound) {
				this.providers.push(providerA);
			}
		});
	}
}