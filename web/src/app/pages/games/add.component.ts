import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

import {routeAnimation} from "../../ui/utilities/route-animation";

import {AccountService} from "../../account/account.service";
import {AccountInterface} from "../../account/account.interface";
import {GameInterface} from "../../games/game.interface";

@Component({
	selector: "pages-games-add",
	templateUrl: "./add.component.html",
	styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit, OnDestroy
{
	private accountSub:Subscription;

	game:GameInterface = {};
	account:AccountInterface;

	constructor(
		private Account:AccountService,
		private Router:Router
	) {}

	ngOnInit() {
		this.accountSub = this.Account.subscribe((account) => {
			this.account = account;

			if (!account.isValid) {
				this.Router.navigate(["/games"]);
			}

			if (!this.game.theme) {
				this.game.theme = {
					background: account.theme.background,
					text: account.theme.text
				};
			}
		});
	}

	ngOnDestroy() {
		this.accountSub.unsubscribe();
	}

	onSave(game:GameInterface) {
		this.Router.navigate(["/g", game.slug]);
	}
}