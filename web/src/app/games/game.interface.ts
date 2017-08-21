import {ThemeInterface} from "../ui/theme.interface";
import {SourceInterface} from "../sources/source.interface";

export interface GameInterface
{
	id?:number;
	slug?:string;
	title?:string;
	description?:string;
	theme?:ThemeInterface;
	coverImage?:string;
	following?:boolean;
}