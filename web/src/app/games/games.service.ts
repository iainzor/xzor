import { Injectable } from '@angular/core';

import { ApiService } from "../xzor/api.service";
import { GameInterface } from "./game.interface";

@Injectable()
export class GamesService
{
	constructor(private api:ApiService) {}

	public loadAll() : Promise<GameInterface[]> {
		return new Promise<GameInterface[]>((resolve, reject) => {
			this.api.get("games.json").then(
				(response) => { resolve(response); }
			);
		});
	}
}