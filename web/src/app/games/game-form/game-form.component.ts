import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Router} from "@angular/router";

import {environment} from "../../../environments/environment";
import {SourceInterface} from "../../sources/source.interface";
import {GameInterface} from "../game.interface";
import {GamesService} from "../games.service";

@Component({
	selector: "game-form",
	templateUrl: "./game-form.component.html"
})
export class GameFormComponent
{
	@Input() game:GameInterface;
	@Output() gameChange:EventEmitter<GameInterface> = new EventEmitter<GameInterface>();
	
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
				this.Router.navigate(["/g", this.game.slug]);
			}
		});
	}

	cancelImport(e:MouseEvent) {
		e.preventDefault();

		this.cancel.emit(this.game);
	}
}