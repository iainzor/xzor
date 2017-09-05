import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {AccountInterface} from "../../../account/account.interface";
import {AccountService} from "../../../account/account.service";
import {UINavPageInterface} from "../../../ui/ui-nav/ui-nav-page.interface";
import {GameInterface} from "../../game.interface";
import {GameService} from "../../game.service";

@Component({
	selector: "page-game-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit, OnDestroy
{
	private accountSub:Subscription;
	private gameSub:Subscription;

	account:AccountInterface;
	game:GameInterface;
	pages:UINavPageInterface[] = [];

	constructor(
		private Account:AccountService,
		private Game:GameService
	) {}

	ngOnInit() {
		this.accountSub = this.Account.subscribe((account) => {
			this.account = account;
			this.regeneratePages();
		});
		this.gameSub = this.Game.subscribe((game) => {
			this.game = game;
			this.regeneratePages();
		});
	}

	ngOnDestroy() {
		this.accountSub.unsubscribe();
		this.gameSub.unsubscribe();
	}

	private regeneratePages() {
		this.pages = [];

		if (this.game) {
			this.pages.push(
				{ title: "Details", path: ["/g", this.game.slug, "manage"], activeExact: true },
				{ title: "Feeds", path: ["/g", this.game.slug, "manage", "feeds"] }
			);
		}
	}
}