import {animate, trigger, transition, style, state} from "@angular/animations";
import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {Router, NavigationStart} from "@angular/router";
import {Subscription} from "rxjs";

import {AccountInterface} from "./account/account.interface";
import {AccountService} from "./account/account.service";
import {AppMenuService} from "./app-menu.service";

@Component({
	selector: "app-menu",
	templateUrl: "./app-menu.component.html",
	styleUrls: ["./app-menu.component.css"],
	animations: [
		trigger("activeTrigger", [
			state("hidden", style({
				transform: "rotate(-90deg)",
				opacity: 0
			})),
			state("visible", style({
				transform: "rotate(0)",
				opacity: 1
			})),

			transition("* => *", animate(".2s ease-in-out"))
		]),
		trigger("inactiveTrigger", [
			state("hidden", style({
				transform: "rotate(90deg)",
				opacity: 0
			})),
			state("visible", style({
				transform: "rotate(0)",
				opacity: 1
			})),

			transition("* => *", animate(".2s ease-in-out"))
		]),
		trigger("contentTrigger", [
			state("hidden-left", style({
				transform: "translateX(-100%)",
				opacity: 0
			})),
			state("hidden-right", style({
				transform: "translateX(100%)",
				opacity: 0
			})),
			state("visible", style({
				transform: "translateX(0)",
				opacity: 1
			})),

			transition("hidden-left <=> visible", animate(".2s ease-in-out")),
			transition("hidden-right <=> visible", animate(".2s ease-in-out"))
		])
	],
	providers: [
		AppMenuService
	]
})
export class AppMenuComponent implements OnInit, OnDestroy, EventListenerObject
{
	private accountSub:Subscription;
	private menuSub:Subscription;
	private routerSub:Subscription;

	side:string = "left";
	open:boolean = false;
	account:AccountInterface;

	activeState:string = "hidden";
	inactiveState:string = "visible";
	contentState:string;

	@Input("side") set _side(side:string) {
		this.side = side;
		this.contentState = "hidden-"+ side;
	}

	@Input() icon:string = "menu";
	@Input() badge:string;
	@Input() width:number = 300;

	constructor(
		private Account:AccountService,
		private Menu:AppMenuService,
		private Router:Router
	) {
		Menu.component = this;
	}

	ngOnInit() {
		this.accountSub = this.Account.subscribe((account) => {
			this.account = account;
		});
		this.menuSub = this.Menu.isOpen.subscribe((isOpen) => {
			this.open = isOpen;

			if (isOpen) {
				this.onOpen();
			} else {
				this.onClose();
			}
		});
		this.routerSub = this.Router.events.subscribe((e) => {
			if (e instanceof NavigationStart) {
				this.Menu.close();
			}
		});
	}

	ngOnDestroy() {
		this.accountSub.unsubscribe();
	}

	onOpen() {
		this.activeState = "visible";
		this.inactiveState = "hidden";
		this.contentState = "visible";

		setTimeout(() => {
			document.addEventListener("click", this);
		});
	}

	onClose() {
		this.activeState = "hidden";
		this.inactiveState = "visible";
		this.contentState = "hidden-"+ this.side;

		document.removeEventListener("click", this);
	}

	handleEvent(e:Event) {
		this.Menu.close();
	}

	interceptClick(e:MouseEvent) {
		e.stopPropagation();
	}

	toggle(e:MouseEvent) {
		e.preventDefault();
		
		this.Menu.toggle();
	}
}