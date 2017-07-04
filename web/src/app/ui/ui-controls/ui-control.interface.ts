export interface UIControlInterface
{
	icon?:string;
	title?:string;
	subtitle?:string;
	divider?:boolean;
	z?:number;
	action?:(control:UIControlInterface) => void
	route?:any;
}