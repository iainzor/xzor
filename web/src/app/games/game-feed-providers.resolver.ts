import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs";

import {GameService} from "./game.service";
import {ProviderInterface} from "../feed/provider.interface";

@Injectable()
export class GameFeedProvidersResolver
{
	constructor(private Game:GameService) {}

	resolve(route:ActivatedRouteSnapshot) : Promise<ProviderInterface[]> {
		return this.Game.getFeedProviders();
	}
}