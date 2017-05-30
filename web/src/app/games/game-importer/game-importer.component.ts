import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Router} from "@angular/router";

import {environment} from "../../../environments/environment";
import {SourceInterface} from "../../sources/source.interface";
import {GameInterface} from "../game.interface";
import {GamesService} from "../games.service";

@Component({
	selector: "game-importer",
	templateUrl: "./game-importer.component.html"
})
export class GameImporterComponent
{
	@Input() game:GameInterface;
	@Input() source:SourceInterface;
	@Output() cancel:EventEmitter<GameInterface> = new EventEmitter<GameInterface>();

	loading:boolean = false;
	isValid:boolean = true;
	success:boolean = false;
	errors:{[field:string]:string} = {};
	environment = environment;

	constructor(private Games:GamesService, private Router:Router) {}

	submit(form) {
		this.loading = true;
		this.Games.import(this.game).then((response) => {
			this.loading = false;
			this.errors = response.errors;
			this.game = response.game;
			this.isValid = response.isValid;

			if (response.isValid) {
				this.Router.navigate(["/games", this.game.slug]);
			}
		});
	}

	cancelImport(e:MouseEvent) {
		e.preventDefault();

		this.cancel.emit(this.game);
	}
}