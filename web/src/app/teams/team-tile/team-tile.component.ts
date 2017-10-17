import {Component, Input} from "@angular/core";

import {TeamInterface} from "../team.interface";

@Component({
	selector: "team-tile",
	templateUrl: "./team-tile.component.html",
	styleUrls: ["./team-tile.component.css"]
})
export class TeamTileComponent
{
	@Input() team:TeamInterface;
}