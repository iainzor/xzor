import {ThemeInterface} from "../ui/theme.interface";

export interface PersonInterface
{
	name:string;
	slug:string;
	created:number;
	updated:number;
	theme?:ThemeInterface;
	data?:{[key:string]:any};
}