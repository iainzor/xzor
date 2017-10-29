import {FeedItemInterface} from "./feed-item.interface";
import {ProviderInterface} from "./provider.interface";
import {ThemeInterface} from "../ui/theme.interface";

export class FeedItem<D>
{
	constructor(public provider:ProviderInterface, public result:FeedItemInterface<D>) {}

	get theme() : ThemeInterface { return this.provider.theme; }

	get image() : string { return this.result.image; }
}