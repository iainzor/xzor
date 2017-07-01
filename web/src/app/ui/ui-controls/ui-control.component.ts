import {Component, Input} from "@angular/core";

import {UIControlInterface} from "./ui-control.interface";

@Component({
	selector: "ui-control",
	templateUrl: "./ui-control.component.html",
	styleUrls: ["./ui-control.component.css"],
	host: {
		"[class.divider]": "control?.divider",
		"(click)": "onClick($event)"
	}
})
export class UIControlComponent
{
	@Input() control:UIControlInterface;

	onClick(e:MouseEvent) {
		e.preventDefault();
		
		if (this.control.action) {
			this.control.action(this.control);
		}
	}
}