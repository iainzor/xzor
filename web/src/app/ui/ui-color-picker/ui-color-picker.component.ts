import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
	selector: "ui-color-picker",
	templateUrl: "./ui-color-picker.component.html",
	styleUrls: ["./ui-color-picker.component.css"]
})
export class UIColorPickerComponent
{
	@Input() color:string;
	@Output() colorChange:EventEmitter<string> = new EventEmitter<string>();
	@Input() label:string;

	onColorChange(color:string) {
		this.color = color;
		this.colorChange.emit(color);
	}
}