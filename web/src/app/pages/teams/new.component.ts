import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {TeamInterface} from "../../teams/team.interface";

@Component({
	selector: "pages-teams-new",
	templateUrl: "new.component.html",
	styleUrls: ["./new.component.css"]
})
export class NewComponent
{
	team:TeamInterface = {
		
	};

	constructor(private Router:Router) {}

	onTeamSave(team:TeamInterface) {
		this.Router.navigate(["/t", team.slug]);
	}
}