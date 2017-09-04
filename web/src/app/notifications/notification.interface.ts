import {ThemeInterface} from "../ui/theme.interface";

export interface NotificationInterface
{
	title?:string;
	message:string;
	theme?:ThemeInterface;
	lifetime?:number;
	created?:Date;
	updated?:Date;
	isExpired?:boolean;
}