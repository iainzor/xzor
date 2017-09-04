import {Component, Input} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
	selector: "ui-icon",
	templateUrl: "./ui-icon.component.html",
	styleUrls: ["./ui-icon.component.css"]
})
export class UIIconComponent
{
	@Input() icon:string;
	@Input() size:number = 24;
}