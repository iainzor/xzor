import {ThemeInterface} from "../ui/theme.interface";

export interface ForumInterface
{
	id:number;
	parentId:number;
	resource:string;
	resourceId:string;
	title:string;
	description:string;
	theme?:ThemeInterface;
}