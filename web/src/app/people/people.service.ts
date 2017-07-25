import {Injectable} from "@angular/core";

import {XzorService} from "../xzor/xzor.service";
import {PersonInterface} from "./person.interface";

@Injectable()
export class PeopleService
{
	constructor(
		private Xzor:XzorService
	) {}

	find() : Promise<PersonInterface[]> {
		return this.Xzor.get("people.json");
	}

	person(slug:string) : Promise<PersonInterface> {
		return this.Xzor.get("p/"+ slug +".json");
	}
}