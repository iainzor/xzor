import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";

import {SourcesService} from "../sources/sources.service";
import {GameInterface} from "./game.interface";


@Injectable()
export class SourceGameResolver implements Resolve<GameInterface>
{
	constructor(
		private Sources:SourcesService
	) {}

	resolve(route:ActivatedRouteSnapshot) : Promise<GameInterface> {
		let sourceSlug = route.params["source"];
		let sourceId = route.params["sourceId"];

		return new Promise<GameInterface>((resolve, reject) => {
			this.Sources.getSourceService(sourceSlug).then((sourceService) => {
				sourceService.load<GameInterface>("games", sourceId).then((game) => {
					resolve(game);
				});
			});
		});
	}
}