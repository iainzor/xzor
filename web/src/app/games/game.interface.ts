import {ThemeInterface} from "../ui/theme.interface";
import {SourceInterface} from "../sources/source.interface";

export interface GameInterface
{
	id?:number;
	slug?:string;
	title?:string;
	description?:string;
	sourceName?:string;
	sourceId?:string;
	source?:SourceInterface;
	theme?:ThemeInterface;
	coverImage?:string;
}