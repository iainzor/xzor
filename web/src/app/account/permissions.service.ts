import {Injectable} from "@angular/core";
import {URLSearchParams} from "@angular/http";

import {Permissions} from "./permissions";
import {XzorService} from "../xzor/xzor.service";

@Injectable()
export class PermissionsService
{
	constructor(private Xzor:XzorService) {}

	forResource(resource:string, resourceId:any) : Promise<Permissions> {
		return new Promise<Permissions>((resolve) => {
			let url = "permissions";
			if (resource) {
				url += "/"+ resource;
			}
			if (resourceId) {
				url += "/"+ resourceId;
			}
			url += ".json";

			this.Xzor
				.get(url)
				.then((response) => {
					resolve(new Permissions(response, resource));
				});
		});
	}
}