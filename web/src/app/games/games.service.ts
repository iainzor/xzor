import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";

import {XzorService} from "../xzor/xzor.service";
import {GameInterface} from "./game.interface";
import {GameFormResponse} from "./game-form-response";
import {GameSearchResponseInterface} from "./game-search-response.interface";

@Injectable()
export class GamesService
{
	constructor(private Xzor:XzorService) {}

	find(q:string = "") : Promise<GameSearchResponseInterface> {
		let params = new URLSearchParams();
		params.set("q", q);
		
		return new Promise<GameSearchResponseInterface>((resolve, reject) => {
			this.Xzor.get("games.json", params).then(
				(response) => { 
					resolve(response); 
				}
			);
		});
	}

	load(slug:string) : Promise<GameInterface> {
		return this.Xzor.get("g/"+ slug +".json");
	}

	save(game:GameInterface) : Promise<GameFormResponse> {
		let url = game.id ? "g/"+ game.slug +".json" : "games/add.json";

		return this.Xzor.post(url, JSON.stringify(game));
	}
}