import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {AccountInterface} from "../../../account/account.interface";
import {AccountService} from "../../../account/account.service";
import {GameInterface} from "../../game.interface";
import {GameService} from "../../game.service";

@Component({
	selector: "page-game-admin-index",
	templateUrl: "./index.component.html"
})
export class IndexComponent implements OnInit, OnDestroy
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