import {Component, Input} from "@angular/core";

import {UIMenuItemInterface} from "./ui-menu-item.interface";

@Component({
	selector: "ui-menu",
	templateUrl: "./ui-menu.component.html",
	styleUrls: ["./ui-menu.component.css"]
})
export class UIMenuComponent
{
	@Input() items:UIMenuItemInterface[] = [];

	onClick(e:MouseEvent, item:UIMenuItemInterface) {
		e.preventDefault();
		
		if (item.onClick) {
			item.onClick(item, e);
		}
	}
}