import {ThemeInterface} from "../ui/theme.interface";

export interface SourceInterface
{
	id:number;
	name:string;
	slug:string;
	website:string;
	theme?:ThemeInterface;
}