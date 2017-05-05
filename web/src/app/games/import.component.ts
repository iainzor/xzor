import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import {SourcesService} from "../sources/sources.service";
import {SourceInterface} from "../sources/source.interface";
import {routeAnimation} from "../ui/utilities/route-animation";
import {GameInterface} from "./game.interface";

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

	constructor(
		private Sources:SourcesService,
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
}