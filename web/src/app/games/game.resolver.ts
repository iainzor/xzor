import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {GameInterface} from "./game.interface";
import {GameService} from "./game.service";

@Injectable()
export class GameResolver implements Resolve<GameInterface>
{
	constructor(private Game:GameService) {}

	resolve(route:ActivatedRouteSnapshot) : Promise<GameInterface> {
		return this.Game.load(route.params["slug"]);
	}
}