import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs/Subscription";

import {routeAnimation} from "../../ui/utilities/route-animation";
import {AppService} from "../../app.service";
import {GameService} from "../game.service";
import {GameInterface} from "../game.interface";

@Component({
	selector: "page-game",
	templateUrl: "./page-game.component.html",
	styleUrls: ["./page-game.component.css"],
	animations: [
		routeAnimation("game")
	],
	host: {
		"[@game]": ""
	}
})
export class PageGameComponent implements OnInit, OnDestroy
{
	private gameSub:Subscription;

	game:GameInterface;

	constructor(
		private App:AppService,
		private Game:GameService
	) {}

	ngOnInit() {
		this.gameSub = this.Game.subscribe((game) => {
			this.game = game;
			this.App.setPageTitle(game.title);
		});
	}

	ngOnDestroy() {
		this.App.resetPageTitle();
		this.gameSub.unsubscribe();
	}
}