import {Component, Input} from "@angular/core";

import {GameInterface} from "../game.interface";

@Component({
	selector: "game-list",
	templateUrl: "./game-list.component.html"
})
export class GameListComponent
{
	@Input() games:GameInterface[];
}