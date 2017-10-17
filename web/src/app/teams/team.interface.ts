import {ThemeInterface} from "../ui/theme.interface";
import {TeamMemberInterface} from "./team-member.interface";

export interface TeamInterface
{
	id?:number;
	slug?:string;
	name?:string;
	description?:string;
	tag?:string;
	tagPosition?:string;

	theme?:ThemeInterface;
	member?:TeamMemberInterface;
	settings?:{[key:string]: any};
}