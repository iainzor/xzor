import {FeedResponseInterface} from "./feed-response.interface";
import {FeedItemInterface} from "./feed-item.interface";
import {FeedItem} from "./feed-item";
import {ProviderInterface} from "./provider.interface";

export class Feed
{
	private items:FeedItem<any>[];
	private providerActiveMap:{[slug:string]:boolean} = {};

	providers:ProviderInterface[] = [];

	constructor(private response:FeedResponseInterface) {
		this.items = [];
		this.providers = response.providers;
		this.providerActiveMap = {};

		this.providers.forEach((provider) => {
			this.providerActiveMap[provider.slug] = true;

			this.items = this.items.concat(
				response.results[provider.slug].map((result) => {
					return new FeedItem(provider, result)
				})
			);
		});
	}

	get results() : FeedItem<any>[] {
		return this.items.filter((item) => {
			return this.providerActive(item.provider);
		}).sort((a, b) => {
			if (a.timestamp === b.timestamp) {
				return 0;
			} else {
				return a.timestamp > b.timestamp ? -1 : 1;
			}
		});
	}

	providerActive(provider:ProviderInterface) : boolean {
		return this.providerActiveMap[provider.slug];
	}

	toggleProvider(provider:ProviderInterface) {
		this.providerActiveMap[provider.slug] = !this.providerActiveMap[provider.slug];
	}
}