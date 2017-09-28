import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Router} from "@angular/router";

import {environment} from "../../../environments/environment";
import {ImageInterface} from "../../images/image.interface";
import {SourceInterface} from "../../sources/source.interface";
import {GameInterface} from "../game.interface";
import {GamesService} from "../games.service";

@Component({
	selector: "game-form",
	templateUrl: "./game-form.component.html",
	styleUrls: ["./game-form.component.css"]
})
export class GameFormComponent
{
	@Input() game:GameInterface;
	@Output() gameChange:EventEmitter<GameInterface> = new EventEmitter<GameInterface>();
	
	@Output() cancel:EventEmitter<GameInterface> = new EventEmitter<GameInterface>();

	loading:boolean = false;
	isValid:boolean = true;
	success:boolean = false;
	errors:any = {};
	environment = environment;

	constructor(private Games:GamesService, private Router:Router) {}

	submit(form) {
		this.loading = true;
		this.Games.save(this.game).then((response) => {
			this.loading = false;
			this.errors = response.errors;
			this.game = response.game;
			this.isValid = response.isValid;

			if (response.isValid) {
				this.Router.navigate(["/g", this.game.slug]);
			}
		});
	}

	onTitleChange(title:string) {
		this.game.title = title;
		this.game.slug = title.replace(/[^a-z0-9-_]/i, "-").toLowerCase();

		this.gameChange.emit(this.game);
	}

	onSlugChange(slug:string) {
		this.game.slug = slug.replace(/[^a-z0-9-_]/i, "-").toLowerCase();
		this.gameChange.emit(this.game);
	}

	onImageChange(image?:ImageInterface) {
		if (image) {
			this.game.coverImage = image.url;
		} else {
			this.game.coverImage = null;
		}

		this.gameChange.emit(this.game);
	}

	cancelImport(e:MouseEvent) {
		e.preventDefault();

		this.cancel.emit(this.game);
	}
}