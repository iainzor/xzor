import {Component} from "@angular/core";
import {animate, style, state, trigger, transition} from "@angular/core";
import {RouterModule} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {UINavService} from "./ui-nav.service";
import {UINavItemInterface} from "./ui-nav-item.interface";

@Component({
	selector: "ui-nav",
	templateUrl: "./ui-nav.component.html",
	styleUrls: ["./ui-nav.component.css"],
	animations: [
		trigger("subNav", [
			transition("void => *", [
				style({
					opacity: 0,
					transform: "translateY(100%)"
				}),
				animate("200ms ease-in-out", style({
					opacity: 1,
					transform: "translateY(0)"
				}))
			]),
			transition("* => void", [
				animate("200ms ease-in-out", style({
					opacity: 0,
					transform: "translateY(100%)"
				}))
			])
		])
	]
})
export class UINavComponent
{
	private navSub:Subscription;

	subNavItems:UINavItemInterface[] = [];

	constructor(private Nav:UINavService) {
		this.navSub = Nav.subNav.subscribe((items) => {
			this.subNavItems = items;
		});
	}

	onItemClick(e:MouseEvent, item:UINavItemInterface) {
		e.preventDefault();

		if (item.callback) {
			item.callback(item);
		} else {
			throw("Nav item does not have a callback function");
		}
	}
}