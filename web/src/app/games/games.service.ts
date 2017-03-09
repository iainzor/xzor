import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";

import {ApiService} from "../xzor/api.service";
import {GameInterface} from "./game.interface";

@Injectable()
export class GamesService
{
	constructor(private api:ApiService) {}

	public find(q:string = "", format:string = "list") : Promise<GameInterface[]> {
		let params = new URLSearchParams();
		params.set("q", q);
		params.set("format", format);
		
		return new Promise<GameInterface[]>((resolve, reject) => {
			this.api.get("games.json", params).then(
				(response) => { resolve(response); }
			);
		});
	}
}