import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {AccountInterface} from "../../../account/account.interface";
import {AccountService} from "../../../account/account.service";
import {GameInterface} from "../../../games/game.interface";
import {GameService} from "../../../games/game.service";
import {NotificationsService} from "../../../notifications/notifications.service";

@Component({
	selector: "pages-game-admin-index",
	templateUrl: "./index.component.html"
})
export class IndexComponent implements OnInit, OnDestroy
{
	private gameSub:Subscription;

	game:GameInterface;

	constructor(
		private Game:GameService,
		private Notifications:NotificationsService
	) {}

	ngOnInit() {
		this.gameSub = this.Game.subscribe((game) => {
			this.game = game;
		});
	}

	ngOnDestroy() {
		this.gameSub.unsubscribe();
	}

	onSave(game:GameInterface) {
		this.Notifications.push({
			message: "Changes to "+ game.title +" have been saved successfully"
		});
	}
}