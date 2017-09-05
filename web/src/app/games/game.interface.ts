import {ThemeInterface} from "../ui/theme.interface";
import {GameRoleInterface} from "./game-role.interface";

export interface GameInterface
{
	id?:number;
	slug?:string;
	title?:string;
	description?:string;
	theme?:ThemeInterface;
	coverImage?:string;
	following?:boolean;
	role?:GameRoleInterface;
}