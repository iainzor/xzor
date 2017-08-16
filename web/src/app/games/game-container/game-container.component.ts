import {Component, Input} from "@angular/core";

import {GameInterface} from "../game.interface";

@Component({
	selector: "game-container",
	templateUrl: "./game-container.component.html",
	styleUrls: ["./game-container.component.css"]
})
export class GameContainerComponent
{
	@Input() game:GameInterface;
}