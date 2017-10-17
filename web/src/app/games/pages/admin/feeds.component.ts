import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
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
	private dataSub:Subscription;

	game:GameInterface;
	providers:ProviderInterface[] = [];

	constructor(
		private Game:GameService,
		private Route:ActivatedRoute
	) {}

	ngOnInit() {
		this.game = this.Game.getGame();
		this.dataSub = this.Route.data.subscribe((data) => {
			this.providers = data["providers"];
		});
	}

	ngOnDestroy() {
		this.dataSub.unsubscribe();
	}
}