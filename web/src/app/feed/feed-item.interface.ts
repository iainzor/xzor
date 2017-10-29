import {ThemeInterface} from "../ui/theme.interface";

export interface FeedItemInterface<Data>
{
	provider:string;
	timestamp:number;
	key:string;
	title:string;
	url:string;
	image:string;
	data:Data;
}