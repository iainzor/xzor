import {Component, Input} from "@angular/core";

import {GameInterface} from "../game.interface";
import {SourcesService} from "../../sources/sources.service";
import {SourceService} from "../../sources/source.service";
import {SourceInterface} from "../../sources/source.interface";

@Component({
	selector: "game-container",
	templateUrl: "./game-container.component.html",
	styleUrls: ["./game-container.component.css"]
})
export class GameContainerComponent
{
	sourceService:SourceService;
	source:SourceInterface;
	game:GameInterface;
	
	constructor(private Sources:SourcesService) {}
	
	@Input("game") set _game(game:GameInterface) {
		this.game = game;
		this.Sources.getSourceService(game.source).then((service) => { 
			this.sourceService = service;
			this.source = service.source;
		});
	}
}