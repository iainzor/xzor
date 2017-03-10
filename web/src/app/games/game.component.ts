import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs/Subscription";

import {routeAnimation} from "../ui/utilities/route-animation";
import {GameService} from "./game.service";
import {GameInterface} from "./game.interface";

@Component({
	selector: "game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.css"],
	animations: [
		routeAnimation("game")
	],
	host: {
		"[@game]": ""
	},
	providers: [
		GameService
	]
})
export class GameComponent implements OnInit, OnDestroy
{
	private gameSub:Subscription;

	game:GameInterface;

	constructor(private Game:GameService) {}

	ngOnInit() {
		this.gameSub = this.Game.subscribe((game) => {
			this.game = game;
		});
	}

	ngOnDestroy() {
		this.gameSub.unsubscribe();
	}
}