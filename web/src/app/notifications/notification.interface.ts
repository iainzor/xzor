import {ThemeInterface} from "../ui/theme.interface";

export interface NotificationInterface
{
	title?:string;
	message:string;
	lifetime?:number;
	theme?:ThemeInterface;
}