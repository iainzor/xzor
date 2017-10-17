import {animate, trigger, transition, style, state} from "@angular/animations";
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Router} from "@angular/router";

import {AppService} from "../../app.service";
import {AccountInterface} from "../account.interface";
import {AccountService} from "../account.service";

@Component({
	selector: "account-menu",
	templateUrl: "./account-menu.component.html",
	styleUrls: ["./account-menu.component.css"],
	animations: [
		trigger("menuTrigger", [
			state("hidden", style({
				opacity: 0,
				transform: "translateX(100%)"
			})),
			state("visible", style({
				opacity: 1,
				transform: "translateX(0)"
			})),
			transition("hidden <=> visible", animate(".2s ease-in-out"))
		])
	],
	host: {
		"[@menuTrigger]": "open ? 'visible' : 'hidden'"
	}
})
export class AccountMenuComponent
{
	@Input() account:AccountInterface;
	
	@Input() open:boolean;
	@Output() openChange:EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(
		private App:AppService,
		private Account:AccountService,
		private Router:Router
	) {}
	
	signOut(e:MouseEvent) {
		e.preventDefault();
		
		this.App.setLoading(true);
		this.Account.signOut().then(() => {
			this.App.setLoading(false);	
			/*
			this.Router.navigate(["sign-in"], {
				queryParams: {
					redirectTo: this.Router.url
				}
			});
			*/
		});
	}
}