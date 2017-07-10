import {FeedItemInterface} from "./feed-item.interface";
import {ProviderInterface} from "./provider.interface";

export interface FeedResponseInterface
{
	providers:ProviderInterface[];
	results:{[provider:string]:FeedItemInterface<any>[]};
}