import {ThemeInterface} from "../ui/theme.interface";
import {FeedItemInterface} from "./feed-item.interface";
import {ProviderSettingInterface} from "./provider-setting.interface";

export interface ProviderInterface
{
	slug:string;
	name:string;
	theme:ThemeInterface;
	active:boolean;
	results:FeedItemInterface<any>[];
	settings:ProviderSettingInterface[];
}