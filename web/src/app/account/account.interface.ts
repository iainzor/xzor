import {ThemeInterface} from "../ui/theme.interface";
import {AccountDataInterface} from "./account-data.interface";

export interface AccountInterface
{
	id?:number;
	name?:string;
	slug?:string;
	created?:number;
	updated?:number;
	isValid:boolean;
	isPublic:boolean;
	data:AccountDataInterface;
	theme:ThemeInterface;
}