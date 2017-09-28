export interface UIMenuItemInterface
{
	title?:string;
	hideTitle?:boolean;
	icon?:string;
	spacer?:boolean;
	onClick?:(item:UIMenuItemInterface, e:MouseEvent) => void;
}