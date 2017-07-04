import {Component} from "@angular/core";
import {routeAnimation} from "../ui/utilities/route-animation";

@Component({
	selector: "players",
	templateUrl: "./players.component.html",
	animations: [
		routeAnimation("players")
	],
	host: {
		"[@players]": ""
	}
})
export class PlayersComponent
{}