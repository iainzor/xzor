import {Component, Input} from "@angular/core";

import {TeamInterface} from "../team.interface";

@Component({
	selector: "team-list",
	templateUrl: "./team-list.component.html",
	styleUrls: ["./team-list.component.css"]
})
export class TeamListComponent
{
	@Input() teams:TeamInterface[] = [];
}