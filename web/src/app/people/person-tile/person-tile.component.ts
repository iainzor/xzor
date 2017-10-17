import {Component, Input} from "@angular/core";

import {PersonInterface} from "../person.interface";

@Component({
	selector: "person-tile",
	templateUrl: "./person-tile.component.html",
	styleUrls: ["./person-tile.component.css"]
})
export class PersonTileComponent
{
	@Input() person:PersonInterface;

	z:number = 1;
}