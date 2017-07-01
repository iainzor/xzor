import {ThemeInterface} from "../ui/theme.interface";

export interface AccountInterface
{
	id?:number;
	name?:string;
	created?:number;
	updated?:number;
	isValid:boolean;
	theme:ThemeInterface;
}