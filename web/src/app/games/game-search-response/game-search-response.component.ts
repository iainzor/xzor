import {Component, Input} from "@angular/core";
import {SourceInterface} from "../../sources/source.interface";
import {SourceSearchResponse} from "../../sources/source-search/source-search-response";
import {GameInterface} from "../game.interface";
import {GameSearchResponse} from "./game-search-response";

@Component({
	selector: "game-search-response",
	templateUrl: "./game-search-response.component.html",
	styleUrls: ["./game-search-response.component.css"]
})
export class GameSearchResponseComponent
{
	private sourceResponses:{[slug:string]:SourceSearchResponse} = {};

	@Input() response:GameSearchResponse;
	@Input() loading:boolean = false;
	@Input() showSources:boolean = false;

	get games() : GameInterface[] {
		let games = this.response ? this.response.results : [];

		for (let slug in this.sourceResponses) {
			let sourceResponse = this.sourceResponses[slug];
			let sourceGames = sourceResponse.results["games"] || [];
			sourceGames.map((game) => { game.theme = sourceResponse.source.theme; });
			
			games = games.concat(sourceGames);
		}

		return games;
	}

	get sources() : SourceInterface[] {
		return this.response ? this.response.sources : [];
	}

	onSourceResponse(response:SourceSearchResponse) {
		this.sourceResponses[response.source.slug] = response;
	}
}