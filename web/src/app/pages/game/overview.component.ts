import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {GameInterface} from "../../games/game.interface";
import {GameService} from "../../games/game.service";

@Component({
	selector: "pages-game-overview",
	templateUrl: "./overview.component.html"
})
export class OverviewComponent implements OnInit, OnDestroy
{
	private gameSub:Subscription;

	game:GameInterface;

	constructor(
		private Game:GameService
	) {}

	ngOnInit() {
		this.gameSub = this.Game.subscribe((game) => {
			this.game = game;
		});
	}

	ngOnDestroy() {
		this.gameSub.unsubscribe();
	}
}