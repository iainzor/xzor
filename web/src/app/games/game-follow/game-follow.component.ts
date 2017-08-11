import {animate, trigger, transition, state, style} from "@angular/animations";
import {Component, Input} from "@angular/core";

import {GameInterface} from "../game.interface";

@Component({
	selector: "game-follow",
	templateUrl: "./game-follow.component.html",
	styleUrls: ["./game-follow.component.css"],
	animations: [
		trigger("icon", [
			state("hidden", style({
				opacity: 0,
				visibility: "hidden"
			})),
			state("visible", style({
				opacity: 1,
				visibility: "visible"
			})),
			transition("hidden <=> visible", animate(".2s ease-in-out"))
		])
	],
	host: {
		"(click)": "toggle($event)"
	}
})
export class GameFollowComponent
{
	@Input() game:GameInterface;

	activeState:string = "hidden";
	blankState:string = "visible";

	toggle(e:MouseEvent) {
		e.preventDefault();
		e.stopPropagation();

		if (this.activeState === "hidden") {
			this.activeState = "visible";
		} else {
			this.activeState = "hidden";
		}
	}
}