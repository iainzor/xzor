import {ThemeInterface} from "../ui/theme.interface";

export interface AccountInterface
{
	id?:number;
	name?:string;
	slug?:string;
	created?:number;
	updated?:number;
	isValid:boolean;
	isPublic:boolean;
	theme:ThemeInterface;
}