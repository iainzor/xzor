import {animate, state, style, trigger, transition} from "@angular/animations";
import {Component, Input} from "@angular/core";

@Component({
	selector: "game-image",
	template: `<img [attr.src]="url" (load)="onImageLoad()">`,
	styleUrls: ["./game-image.component.css"],
	animations: [
		trigger("image", [
			state("loading", style({
				opacity: 0
			})),
			state("loaded", style({
				opacity: 1
			})),
			transition("loading => loaded", animate(".2s ease-in-out"))
		])
	],
	host: {
		"[@image]": "imageState"
	}
})
export class GameImageComponent
{
	imageState:string = "loading";

	@Input() url:string;

	onImageLoad() {
		this.imageState = "loaded";
	}
}