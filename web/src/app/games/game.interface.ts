import {ThemeInterface} from "../ui/theme.interface";

export interface GameInterface
{
	id?:number;
	slug?:string;
	title?:string;
	description?:string;
	source?:string;
	sourceId?:string;
	theme?:ThemeInterface;
	coverImage?:string;
}