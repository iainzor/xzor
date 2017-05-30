import {Component} from "@angular/core";
import {routeAnimation} from "../ui/utilities/route-animation";

@Component({
	selector: "gamers",
	templateUrl: "./gamers.component.html",
	animations: [
		routeAnimation("gamers")
	],
	host: {
		"[@gamers]": ""
	}
})
export class GamersComponent
{}