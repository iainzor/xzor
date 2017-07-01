import {animate, state, style, transition, trigger} from "@angular/animations";
import {Component, Input} from "@angular/core";
import {SourceInterface} from "../../sources/source.interface";
import {SourceSearchResponse} from "../../sources/source-search/source-search-response";
import {GameInterface} from "../game.interface";
import {GameSearchResponse} from "./game-search-response";

@Component({
	selector: "game-search-response",
	templateUrl: "./game-search-response.component.html",
	styleUrls: ["./game-search-response.component.css"],
	animations: [
		trigger("slideIn", [
			transition(":enter", [
				style({
					opacity: 0,
					height: 0
				}),
				animate(".2s ease-in-out", style({
					opacity: 1,
					height: "*"
				}))
			]),
			transition(":leave", [
				animate(".2s ease-in-out", style({
					opacity: 0,
					height: 0
				}))
			])
		])
	]
})
export class GameSearchResponseComponent
{
	private sourceResponses:{[slug:string]:SourceSearchResponse} = {};

	importGame:GameInterface;
	importGameSource:SourceInterface;

	@Input() response:GameSearchResponse;
	@Input() loading:boolean = false;
	@Input() showSources:boolean = false;

	get games() : GameInterface[] {
		let games = this.response ? this.response.results : [];
		let sourceMap:any = {};

		games.forEach((game) => {
			let key = game.sourceName +":"+ game.sourceId;
			sourceMap[key] = true;
		});

/*
		for (let slug in this.sourceResponses) {
			let sourceResponse = this.sourceResponses[slug];
			let sourceGames:GameInterface[] = sourceResponse.results["games"] || [];
			let filtered = sourceGames.filter((game) => {
				let key = game.sourceName +":"+ game.sourceId;
				return !sourceMap[key];
			}).map((game) => { 
				game.theme = sourceResponse.source.theme; 
				return game; 
			});
			
			games = games.concat(filtered);
		}
*/
		return games;
	}

	get sources() : SourceInterface[] {
		return this.response ? this.response.sources : [];
	}

	onSourceResponse(response:SourceSearchResponse) {
		this.sourceResponses[response.source.slug] = response;
	}
}