import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";

import {XzorService} from "../xzor/xzor.service";
import {GameInterface} from "./game.interface";
import {GameImportResponse} from "./game-import-response";
import {GameSearchResponse} from "./game-search-response/game-search-response";

@Injectable()
export class GamesService
{
	constructor(private Xzor:XzorService) {}

	find(q:string = "") : Promise<GameSearchResponse> {
		let params = new URLSearchParams();
		params.set("q", q);
		
		return new Promise<GameSearchResponse>((resolve, reject) => {
			this.Xzor.get("games.json", params).then(
				(response) => { 
					resolve({
						q: q,
						results: response.results,
						sources: response.sources
					}); 
				}
			);
		});
	}

	import(game:GameInterface) : Promise<GameImportResponse> {
		return this.Xzor.post("import-game.json", JSON.stringify(game));
	}
}