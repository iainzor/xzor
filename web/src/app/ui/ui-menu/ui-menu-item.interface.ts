export interface UIMenuItemInterface
{
	title?:string;
	routerLink?:any;
	queryParams?:any;
	hideTitle?:boolean;
	icon?:string;
	spacer?:boolean;
	onClick?:(item:UIMenuItemInterface, e:MouseEvent) => void;
}