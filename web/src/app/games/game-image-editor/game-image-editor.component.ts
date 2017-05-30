import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
	selector: "game-image-editor",
	templateUrl: "./game-image-editor.component.html",
	styleUrls: ["./game-image-editor.component.css"]
})
export class GameImageEditorComponent
{
	@Input() image:string;
	@Output() imageChange:EventEmitter<string> = new EventEmitter<string>();
}