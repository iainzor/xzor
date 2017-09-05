import {FeedItemInterface} from "./feed-item.interface";
import {ProviderInterface} from "./provider.interface";

export class FeedItem<D>
{
	constructor(public provider:ProviderInterface, public result:FeedItemInterface<D>) {}
}