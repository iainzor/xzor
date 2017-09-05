import {GameInterface} from "./game.interface";

export interface GameSearchResponseInterface
{
	results:GameInterface[];
	q:string;
}