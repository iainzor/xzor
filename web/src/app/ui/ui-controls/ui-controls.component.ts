import {Component, Input} from "@angular/core";

import {UIControlInterface} from "./ui-control.interface";

@Component({
	selector: "ui-controls",
	templateUrl: "./ui-controls.component.html",
	styleUrls: ["./ui-controls.component.css"]
})
export class UIControlsComponent
{
	@Input() controls:UIControlInterface[] = [];
}