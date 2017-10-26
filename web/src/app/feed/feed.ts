import {FeedItemInterface} from "./feed-item.interface";
import {FeedItem} from "./feed-item";
import {ProviderInterface} from "./provider.interface";

export class Feed
{
	private _merged:Feed[] = [];

	items:FeedItem<any>[] = [];

	constructor(public providers:ProviderInterface[]) {
		providers.forEach((provider) => { 
			provider.active = true; 
		});

		this.generate();
	}

	get isEmpty() : boolean {
		return this.items.length === 0;
	}
	
	get results() : FeedItem<any>[] {
		return this.items.filter((result) => result.provider.active).sort((a, b) => {
			if (a.result.timestamp === b.result.timestamp) {
				return 0;
			} else {
				return a.result.timestamp > b.result.timestamp ? -1 : 1;
			}
		});
	}

	empty() {
		this._merged = [];
		this.providers = [];
		this.items = [];
	}

	generate() : FeedItem<any>[] {
		let providers = [];

		this.providers.forEach((provider) => {
			provider.results.forEach((item) => {
				this.items.push(
					new FeedItem<any>(provider, item)
				);
			});
		});

		this._merged.forEach((feed) => {
			this.providers = this.providers.concat(feed.providers);
		});

		return this.items;
	}

	merge(feed:Feed) {
		if (this._merged.indexOf(feed) < 0) {
			this._merged.push(feed);
		}
		
		this.generate();
	}
}