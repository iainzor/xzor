import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {GameInterface} from "./game.interface";
import {GamesService} from "./games.service";
import {GameService} from "./game.service";

@Injectable()
export class GameResolver implements Resolve<GameInterface>
{
	constructor(private Games:GamesService, private Game:GameService) {}

	resolve(route:ActivatedRouteSnapshot) : Promise<GameInterface> {
		let promise = this.Games.load(route.params["slug"]);
		promise.then((game) => {
			this.Game.setGame(game);
		});
		return promise;
	}
}