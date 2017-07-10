import {FeedItemInterface} from "./feed-item.interface";
import {ProviderInterface} from "./provider.interface";

export class FeedItem<Data> implements FeedItemInterface<Data>
{
	provider:ProviderInterface;
	title:string;
	url:string;
	data:Data;

	constructor(provider:ProviderInterface, item:FeedItemInterface<Data>) {
		this.provider = provider;
		this.title = item.title;
		this.url = item.url;
		this.data = item.data;
	}
}