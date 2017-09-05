import {animate, state, style, trigger, transition} from "@angular/animations";
import {Component, OnInit, OnDestroy, Input, ElementRef} from "@angular/core";

import {ImageInterface} from "../../images/image.interface";

@Component({
	selector: "game-image",
	template: `<img [@image]="imageState" [attr.src]="url" (load)="onImageLoad()">`,
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
	]
})
export class GameImageComponent implements OnInit, OnDestroy, EventListenerObject
{
	imageState:string = "loading";

	@Input() url:string;
	@Input() scale:boolean = false;

	constructor(private ElRef:ElementRef) {}

	ngOnInit() {
		window.addEventListener("resize", this);
	}

	ngOnDestroy() {
		window.removeEventListener("resize", this);
	}

	onImageLoad() {
		this.imageState = "loaded";
		this.scaleImage();
	}

	scaleImage() {
		if (this.scale) {
			let el:HTMLElement = this.ElRef.nativeElement;
			let img:HTMLImageElement = el.querySelector("img");
			let parent = el.parentElement;

			img.style.width = parent.offsetWidth +"px";
			img.style.height = "auto";

			if (img.offsetHeight < parent.offsetHeight) {
				img.style.width = "auto";
				img.style.height = parent.offsetHeight +"px";
			}
			if (img.offsetWidth < parent.offsetWidth) {
				img.style.width = img.offsetWidth +"px";
				img.style.height = "auto";
			}
		}
	}

	handleEvent(e:Event) {
		if (e.type === "resize") {
			this.scaleImage();
		}
	}
}