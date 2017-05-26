import {GameInterface} from "./game.interface";

export interface GameImportResponse
{
	success:boolean;
	isValid:boolean;
	errors:{[field:string]:string};
	game:GameInterface;
}