import {animate, transition, trigger, style, state} from "@angular/animations";
import {Component, Input} from "@angular/core";

import {UIMenuItemInterface} from "./ui-menu-item.interface";

@Component({
	selector: "ui-menu",
	templateUrl: "./ui-menu.component.html",
	styleUrls: ["./ui-menu.component.css"],
	animations: [
		trigger("subMenu", [
			transition(":enter", [
				style({
					opacity: 0,
					transform: "translateY(-10px)"
				}),
				animate(".2s ease-in-out", style({
					opacity: 1,
					transform: "translateY(0)"
				}))
			]),
			transition(":leave", [
				animate(".2s ease-in-out", style({
					opacity: 0,
					transform: "translateY(-10px)"
				}))
			])
		])
	]
})
export class UIMenuComponent
{
	@Input() items:UIMenuItemInterface[] = [];

	onClick(e:MouseEvent, item:UIMenuItemInterface) {
		e.preventDefault();

		if (item.children && item.children.length > 0) {
			item.isOpen = !item.isOpen;
		}

		if (item.isOpen) {
			this.items.forEach((i) => {
				if (i !== item) {
					i.isOpen = false;
				}
			});
		}
		
		if (item.onClick) {
			item.onClick(item, e);
		}
	}
}