import {Component, Input} from "@angular/core";
import {GameInterface} from "../game.interface";

@Component({
	selector: "game-tile",
	templateUrl: "./game-tile.component.html",
	styleUrls: ["./game-tile.component.css"],
	host: {
		"(mouseenter)": "onMouseEnter()",
		"(mouseleave)": "onMouseLeave()"
	}
})
export class GameTileComponent
{
	@Input() game:GameInterface;

	infoZ:number = 1;

	onMouseEnter() {
		this.infoZ = 3;
	}

	onMouseLeave() {
		this.infoZ = 1;
	}
}