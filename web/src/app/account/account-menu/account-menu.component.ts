import {animate, trigger, transition, style, state} from "@angular/animations";
import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Router, NavigationStart} from "@angular/router";
import {Subscription} from "rxjs";

import {AppService} from "../../app.service";
import {AccountInterface} from "../account.interface";
import {AccountService} from "../account.service";

@Component({
	selector: "account-menu",
	templateUrl: "./account-menu.component.html",
	styleUrls: ["./account-menu.component.css"],
	animations: [
		trigger("expansion", [
			transition(":enter", [
				style({
					opacity: 0,
					transform: "translateX(30px)"
				}),
				animate(".1s ease-in-out", style({
					opacity: 1,
					transform: "none"
				}))
			]),
			transition(":leave", [
				animate(".1s ease-in-out", style({
					opacity: 0,
					transform: "translateX(30px)"
				}))
			])
		])
	],
	host: {
		"(click)": "interceptClick($event)"
	}
})
export class AccountMenuComponent implements OnInit, OnDestroy, EventListenerObject
{
	private routerSub:Subscription;

	@Input() account:AccountInterface;

	isOpen:boolean = false;

	constructor(
		private App:AppService,
		private Account:AccountService,
		private Router:Router
	) {}

	ngOnInit() {
		this.routerSub = this.Router.events.subscribe((e) => {
			if (e instanceof NavigationStart) {
				this.isOpen = false;
			}
		});

		document.addEventListener("click", this);
	}

	ngOnDestroy() {
		this.routerSub.unsubscribe();
		document.removeEventListener("click", this);
	}

	toggle(e:MouseEvent) {
		e.preventDefault();
		
		this.isOpen = !this.isOpen;
	}
	
	signOut(e:MouseEvent) {
		e.preventDefault();
		
		this.App.setLoading(true);
		this.Account.signOut().then(() => {
			this.App.setLoading(false);	
		});
	}

	handleEvent(e:Event) {
		this.isOpen = false;
	}

	interceptClick(e:Event) {
		e.stopPropagation();
	}
}