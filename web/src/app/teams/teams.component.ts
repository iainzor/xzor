import {Component} from "@angular/core";
import {routeAnimation} from "../ui/utilities/route-animation";

@Component({
	selector: "teams",
	templateUrl: "./teams.component.html",
	animations: [
		routeAnimation("teams")
	],
	host: {
		"[@teams]": ""
	}
})
export class TeamsComponent
{}