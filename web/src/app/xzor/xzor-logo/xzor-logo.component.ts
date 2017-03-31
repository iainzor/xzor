import {Component, Input} from "@angular/core";

@Component({
	selector: "xzor-logo",
	templateUrl: "./xzor-logo.component.html",
	styleUrls: ["./xzor-logo.component.css"],
	host: {
		"[style.width.px]": "size",
		"[style.height.px]": "size",
		"[class.spin]": "spinning"
	}
})
export class XzorLogoComponent
{
	@Input() size:number = 100;
	@Input() spinning:boolean = false;
}