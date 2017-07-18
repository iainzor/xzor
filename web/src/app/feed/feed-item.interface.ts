import {ThemeInterface} from "../ui/theme.interface";

export interface FeedItemInterface<Data>
{
	timestamp:number;
	title:string;
	url:string;
	data:Data;
}