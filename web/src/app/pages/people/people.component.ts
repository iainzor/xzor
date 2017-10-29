import {Component} from "@angular/core";

import {routeAnimation} from "../../ui/utilities/route-animation";

@Component({
	selector: "pages-people",
	templateUrl: "./people.component.html",
	styleUrls: ["./people.component.css"],
	animations: [
		routeAnimation("people")
	],
	host: {
		"[@people]": ""
	}
})
export class PeopleComponent
{}