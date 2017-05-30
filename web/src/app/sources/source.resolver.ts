import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";

import {XzorService} from "../xzor/xzor.service";
import {SourceInterface} from "./source.interface";
import {SourcesService} from "./sources.service";

@Injectable()
export class SourceResolver implements Resolve<SourceInterface>
{
	constructor(private Xzor:XzorService) {}

	resolve(route:ActivatedRouteSnapshot) : Promise<SourceInterface> {
		let slug = route.params["slug"];
		
		return this.Xzor.get("sources/"+ slug +".json");
	}
}