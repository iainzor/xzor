import {Component, Input} from "@angular/core";
import {GameInterface} from "../game.interface";

@Component({
	selector: "game-tile",
	templateUrl: "./game-tile.component.html",
	styleUrls: ["./game-tile.component.css"]
})
export class GameTileComponent
{
	@Input() game:GameInterface;
}