import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import {GameInterface} from "./game.interface";

@Component({
	selector: "game-import",
	templateUrl: "./import.component.html"
})
export class ImportComponent implements OnInit, OnDestroy
{
	private dataSub:Subscription;
	
	game:GameInterface;

	constructor(private Route:ActivatedRoute) {}

	ngOnInit() {
		this.dataSub = this.Route.data.subscribe((data) => {
			this.game = data["game"];
		});
	}

	ngOnDestroy() {
		this.dataSub.unsubscribe();
	}
}