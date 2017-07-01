import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {routeAnimation} from "../../ui/utilities/route-animation";

import {AccountService} from "../../account/account.service";
import {AccountInterface} from "../../account/account.interface";
import {GameInterface} from "../game.interface";

@Component({
	selector: "page-add-game",
	templateUrl: "./page-add-game.component.html",
	styleUrls: ["./page-add-game.component.css"],
	animations: [
		routeAnimation("addGame")
	],
	host: {
		"[@addGame]": ""
	}
})
export class PageAddGameComponent implements OnInit, OnDestroy
{
	private accountSub:Subscription;

	game:GameInterface = {};
	account:AccountInterface;

	constructor(private Account:AccountService) {}

	ngOnInit() {
		this.accountSub = this.Account.subscribe((account) => {
			this.account = account;
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
}