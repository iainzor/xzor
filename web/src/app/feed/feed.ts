import {FeedItemInterface} from "./feed-item.interface";
import {FeedItem} from "./feed-item";
import {FeedResponseInterface} from "./feed-response.interface";
import {ProviderInterface} from "./provider.interface";

export class Feed
{
	private _providers:{[name:string]:ProviderInterface} = {};
	private _items:{[key:string]:FeedItem<any>} = {};

	items:FeedItem<any>[] = [];
	providers:ProviderInterface[] = [];

	constructor(response:FeedResponseInterface = null) {
		this._providers = {};
		this._items = {};

		if (response) {
			response.providers.forEach((provider) => {
				this._providers[provider.slug] = provider; 
				provider.active = true;
			});
			response.results.forEach((result) => {
				this._items[result.key] = new FeedItem(
					this._providers[result.provider],
					result
				);
			});
		}

		this.generate();
	}

	get isEmpty() : boolean {
		return this.items.length === 0;
	}

	empty() {
		this._providers = {};
		this._items = {};
		
		this.items = [];
		this.providers = [];
	}

	generate() {
		let providers = [];
		for (let name in this._providers) {
			providers.push(this._providers[name]);
		}

		this.providers = providers.sort((a, b) => {
			if (a.name === b.name) { return 0; }
			return a.name > b.name ? 1 : -1;
		});

		let items = [];
		for (let key in this._items) {
			let item = this._items[key];
			let provider = this._providers[item.result.provider];

			if (provider.active) {
				items.push(item);
			}
		}
		this.items = items.sort((a:FeedItem<any>, b:FeedItem<any>) => {
			if (a.result.timestamp === b.result.timestamp) {
				return 0;
			} else {
				return a.result.timestamp < b.result.timestamp ? 1 : -1;
			}
		});
	}

	merge(feed:Feed) {
		feed.providers.forEach((p) => {
			if (!this._providers[p.slug]) {
				this._providers[p.slug] = p;
			}
		});
		feed.items.forEach((item) => {
			if (!this._items[item.result.key]) {
				this._items[item.result.key] = item;
			}
		});
		this.generate();
	}
}