import {Component, Input} from "@angular/core";

@Component({
	selector: "ui-button",
	templateUrl: "./ui-button.component.html",
	styleUrls: ["./ui-button.component.css"]
})
export class UIButtonComponent
{
	@Input() value:string;
}