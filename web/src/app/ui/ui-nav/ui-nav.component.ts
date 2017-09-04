import {Component, Input} from "@angular/core";

import {UINavPageInterface} from  "./ui-nav-page.interface";

@Component({
	selector:  "ui-nav",
	templateUrl: "./ui-nav.component.html",
	styleUrls: ["./ui-nav.component.css"]
})
export class UINavComponent
{
	@Input() pages:UINavPageInterface[];

	handleClick(e:MouseEvent, page:UINavPageInterface) {
		if (page.callback) {
			e.preventDefault();

			page.callback(e);
		}
	}
}