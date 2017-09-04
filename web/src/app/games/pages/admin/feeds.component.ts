import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {ProviderInterface} from "../../../feed/provider.interface";
import {GameInterface} from "../../game.interface";
import {GameService} from "../../game.service";

@Component({
	selector: "page-game-admin-feeds",
	templateUrl: "./feeds.component.html"
})
export class FeedsComponent implements OnInit, OnDestroy
{
	private gameSub:Subscription;

	game:GameInterface;
	providers:ProviderInterface[] = [];

	constructor(
		private Game:GameService
	) {}

	ngOnInit() {
		this.gameSub = this.Game.subscribe((game) => {
			this.game = game;

			this.Game.getFeedProviders().then((providers) => {
				this.providers = providers;
			});
		});
	}

	ngOnDestroy() {
		this.gameSub.unsubscribe();
	}
}