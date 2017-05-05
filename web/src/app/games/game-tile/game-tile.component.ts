import {Component, Input} from "@angular/core";
import {GameInterface} from "../game.interface";

@Component({
	selector: "game-tile",
	templateUrl: "./game-tile.component.html",
	styleUrls: ["./game-tile.component.css"],
	host: {
		"(mouseenter)": "z=3",
		"(mouseleave)": "z=1",
		"(mousedown)": "z=5",
		"(mouseup)": "z=3" 
	}
})
export class GameTileComponent
{
	@Input() game:GameInterface;

	z:number = 0;
	coverLoaded:boolean = false;

	onCoverLoad(e:Event) {
		this.coverLoaded = true;
		//this.adjust(<HTMLImageElement> e.target);
	}

	adjust(target:HTMLImageElement) {
		let parent = target.parentElement;

		delete target.width;
		target.height = parent.clientHeight;
		
		if (target.clientWidth < parent.clientWidth) {
			target.width = parent.clientWidth;
			delete target.width;
		}

		let diffY = (parent.offsetHeight - target.offsetHeight) / 2;
		let diffX = (parent.offsetWidth - target.offsetWidth) / 2;

		target.style.transform = "translate("+ diffX +"px, "+ diffY +"px)";
	}
}