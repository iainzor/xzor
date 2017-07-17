import {FeedItemInterface} from "./feed-item.interface";
import {ProviderInterface} from "./provider.interface";

export class FeedItem<Data> implements FeedItemInterface<Data>
{
	provider:ProviderInterface;
	timestamp:number;
	title:string;
	url:string;
	data:Data;

	constructor(provider:ProviderInterface, item:FeedItemInterface<Data>) {
		this.provider = provider;

		for (let key in item) {
			this[key] = item[key];
		}
	}
}