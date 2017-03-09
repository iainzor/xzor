import {Component} from "@angular/core";

import {routeAnimation} from "../ui/utilities/route-animation";
import {GamesService} from "./games.service";

@Component({
	selector: "game",
	template: `This is a game!`,
	animations: [
		routeAnimation("game")
	],
	host: {
		"[@game]": ""
	}
})
export class GameComponent
{
	
}