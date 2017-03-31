import {Component, Input} from "@angular/core";

@Component({
	selector: "ui-spinner",
	templateUrl: "./ui-spinner.component.html",
	styleUrls: ["./ui-spinner.component.css"]
})
export class UISpinnerComponent
{
	active:boolean = false;
	z:number = 0;
	
	@Input("active") set _active(active:boolean) {
		this.active = active;

		if (active) {
			this.z = 4;
		} else {
			this.z = 0;
		}
	}
}