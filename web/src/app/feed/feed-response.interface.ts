import {ProviderInterface} from "./provider.interface";
import {FeedItemInterface} from "./feed-item.interface";

export interface FeedResponseInterface
{
	providers:ProviderInterface[];
	results:FeedItemInterface<any>[];
}