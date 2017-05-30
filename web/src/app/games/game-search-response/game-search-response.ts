import {SourceInterface} from "../../sources/source.interface";
import {GameInterface} from "../game.interface";

export interface GameSearchResponse
{
	q:string;
	results:GameInterface[];
	sources:SourceInterface[];
}