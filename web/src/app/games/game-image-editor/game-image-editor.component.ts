import {Component, Input, Output, EventEmitter} from "@angular/core";
import {FormControl} from "@angular/forms";

import {ImageInterface} from "../../images/image.interface";

@Component({
	selector: "game-image-editor",
	templateUrl: "./game-image-editor.component.html",
	styleUrls: ["./game-image-editor.component.css"]
})
export class GameImageEditorComponent
{
	@Input() image:ImageInterface;
	@Output() imageChange:EventEmitter<ImageInterface> = new EventEmitter<ImageInterface>();

	@Input() set url(url:string) {
		this.image = { url: url };
		this.imageChange.emit(this.image);
	}

	onImage(image:ImageInterface) {
		this.image = image;
		this.imageChange.emit(this.image);
	}
}