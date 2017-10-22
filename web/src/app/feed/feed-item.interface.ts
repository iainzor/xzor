import {ThemeInterface} from "../ui/theme.interface";

export interface FeedItemInterface<Data>
{
	timestamp:number;
	key:string;
	title:string;
	url:string;
	data:Data;
}