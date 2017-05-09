import {GameInterface} from "./game.interface";

export interface GameImportResponse
{
	success:boolean;
	errors:{[field:string]:string};
	game:GameInterface;
}