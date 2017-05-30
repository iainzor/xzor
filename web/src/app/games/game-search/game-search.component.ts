import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Router} from "@angular/router";
import {GamesService} from "../games.service";
import {GameInterface} from "../game.interface";

@Component({
	selector: "game-search",
	templateUrl: "./game-search.component.html",
	styleUrls: ["./game-search.component.css"]
})
export class GameSearchComponent
{
	@Input() q:string = "";
	@Output() qChange:EventEmitter<string> = new EventEmitter<string>();

	titles:string[];

	constructor(
		private Games:GamesService,
		private Router:Router
	) {}

	onChange(q) {
		this.q = q;
		this.Games.find(q).then((response) => {
			this.titles = response.results.map((game) => game.title);
		});
	}

	submit() {
		this.qChange.emit(this.q);
		this.Router.navigate(["/games"], { 
			queryParams: {
				q: this.q
			}
		});
	}
}