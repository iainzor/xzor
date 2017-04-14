import {Component, OnInit, OnDestroy} from "@angular/core";
import {animate, style, state, trigger, transition} from "@angular/core";
import {RouterModule} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {AppService} from "../../app.service";
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
export class UINavComponent implements OnInit, OnDestroy
{
	private navSub:Subscription;
	private loadingSub:Subscription;

	subNavItems:UINavItemInterface[] = [];
	loading:boolean = false;

	constructor(private App:AppService, private Nav:UINavService) {
		
	}

	ngOnInit() {
		this.loadingSub = this.App.loading.subscribe((loading) => {
			this.loading = loading;
		});
		this.navSub = this.Nav.subNav.subscribe((items) => {
			this.subNavItems = items;
		});
	}

	ngOnDestroy() {
		this.navSub.unsubscribe();
		this.loadingSub.unsubscribe();
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