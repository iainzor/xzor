import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {routeAnimation} from "../../../ui/utilities/route-animation";
import {AppService} from "../../../app.service";
import {GameService} from "../../game.service";
import {GameInterface} from "../../game.interface";

@Component({
	selector: "page-game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.css"],
	animations: [
		routeAnimation("game")
	],
	host: {
		"[@game]": ""
	}
})
export class GameComponent implements OnInit, OnDestroy
{
	private gameSub:Subscription;

	game:GameInterface;

	constructor(
		private App:AppService,
		private Route:ActivatedRoute,
	) {}

	ngOnInit() {
		this.gameSub = this.Route.data.subscribe((data) => {
			this.game = data["game"];
			this.App.setPageTitle(this.game.title);
		});
	}

	ngOnDestroy() {
		this.App.resetPageTitle();
		this.gameSub.unsubscribe();
	}
}