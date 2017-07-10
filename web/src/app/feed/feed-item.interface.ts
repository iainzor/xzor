import {ThemeInterface} from "../ui/theme.interface";

export interface FeedItemInterface<Data>
{
	title:string;
	url:string;
	data:Data;
}