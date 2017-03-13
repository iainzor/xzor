import {RouterLink} from "@angular/router";

export interface UINavItemInterface
{
	title:string;
	icon:string;

	active?:boolean;
	callback?:((item:UINavItemInterface) => void);
	routerLink?:any;
}