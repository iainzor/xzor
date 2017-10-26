import {ThemeInterface} from "../theme.interface";

export interface UIMenuItemInterface
{
	title?:string;
	routerLink?:any;
	queryParams?:any;
	hideTitle?:boolean;
	icon?:string;
	spacer?:boolean;
	children?:UIMenuItemInterface[];
	theme?:ThemeInterface;
	isOpen?:boolean;
	onClick?:(item:UIMenuItemInterface, e:MouseEvent) => void;
}