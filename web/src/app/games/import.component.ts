import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

import {environment} from "../../environments/environment";
import {SourcesService} from "../sources/sources.service";
import {SourceInterface} from "../sources/source.interface";
import {routeAnimation} from "../ui/utilities/route-animation";
import {GameInterface} from "./game.interface";
import {GamesService} from "./games.service";

@Component({
	selector: "game-import",
	templateUrl: "./import.component.html",
	styleUrls: ["./import.component.css"],
	animations: [
		routeAnimation("gameImportAnimation")
	],
	host: {
		"[@gameImportAnimation]": ""
	}
})
export class ImportComponent implements OnInit, OnDestroy
{
	private routeSub:Subscription;
	private sourceSub:Subscription;

	game:GameInterface;
	source:SourceInterface;
	environment = environment;

	constructor(
		private Games:GamesService,
		private Sources:SourcesService,
		private Router:Router,
		private Route:ActivatedRoute
	) {}

	ngOnInit() {
		this.routeSub = this.Route.data.subscribe((data) => {
			this.game = data["game"];
			this.Sources.getSourceService(this.game.source).then((source) => { this.source = source.source; });
		});
	}

	ngOnDestroy() {
		this.routeSub.unsubscribe();
	}

	submit() {
		this.Games.import(this.game).then((response) => {
			console.log(response);
		});
	}

	cancel(e:MouseEvent) {
		e.preventDefault();
		this.Router.navigate(["/games"]);
	}
}