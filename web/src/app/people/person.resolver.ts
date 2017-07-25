import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";

import {PeopleService} from "./people.service";
import {PersonInterface} from "./person.interface";

@Injectable()
export class PersonResolver implements Resolve<PersonInterface> 
{
	constructor(private People:PeopleService) {}

	resolve(route:ActivatedRouteSnapshot) : Promise<PersonInterface> {
		return this.People.person(
			route.params["slug"]
		);
	}
}