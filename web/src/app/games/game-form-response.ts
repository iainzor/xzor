import {GameInterface} from "./game.interface";

export interface GameFormResponse
{
	success:boolean;
	isValid:boolean;
	errors:{[field:string]:string};
	game:GameInterface;
}