import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";

import {XzorService} from "../xzor/xzor.service";
import {GameInterface} from "./game.interface";

@Injectable()
export class GamesService
{
	constructor(private Xzor:XzorService) {}

	public find(q:string = "") : Promise<GameInterface[]> {
		let params = new URLSearchParams();
		params.set("q", q);
		
		return new Promise<GameInterface[]>((resolve, reject) => {
			this.Xzor.get("games.json", params).then(
				(response) => { resolve(response); }
			);
		});
	}
}