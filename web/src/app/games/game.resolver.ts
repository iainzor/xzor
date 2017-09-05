import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {GameInterface} from "./game.interface";
import {GamesService} from "./games.service";

@Injectable()
export class GameResolver implements Resolve<GameInterface>
{
	constructor(private Games:GamesService) {}

	resolve(route:ActivatedRouteSnapshot) : Promise<GameInterface> {
		return this.Games.load(route.params["slug"]);
	}
}