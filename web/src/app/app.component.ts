import {animate, transition, trigger, style, state} from "@angular/animations";
import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, NavigationStart} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {AppService} from "./app.service";
import {UINavService} from "./ui/ui.module";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	animations: [
		trigger("spinner", [
			transition(":enter", [
				style({
					transform: "scale(.5)",
					opacity: 0
				}),
				animate(".1s ease-in-out", style({
					transform: "scale(1)",
					opacity: 1
				}))
			]),
			transition(":leave", [
				animate(".1s ease-in-out", style({
					transform: "scale(.5)",
					opacity: 0
				}))
			])
		])
	]
})
export class AppComponent implements OnInit, OnDestroy 
{
	private routerSub:Subscription;
	private loadingSub:Subscription;

	loading:boolean = true;

	constructor(
		private App:AppService,
		private Router:Router, 
		private Nav:UINavService
	) {}

	ngOnInit() {
		this.loadingSub = this.App.loading.subscribe((loading) => {
			this.loading = loading;
		});
		this.routerSub = this.Router.events.subscribe((e) => {
			if (e instanceof  NavigationStart) {
				this.Nav.clearSubNav();
			}
		});
	}

	ngOnDestroy() {
		this.routerSub.unsubscribe();
		this.loadingSub.unsubscribe();
	}
}
