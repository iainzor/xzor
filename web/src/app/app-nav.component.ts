import {animate, trigger, transition, style, state} from "@angular/animations";
import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {AppService} from "./app.service";
import {AccountInterface} from "./account/account.interface";

@Component({
	selector: "app-nav",
	templateUrl: "./app-nav.component.html",
	styleUrls: ["./app-nav.component.css"],
	animations: [
		trigger("menu", [
			transition(":enter", [
				style({
					opacity: 0,
					transform: "translateX(-30px)"
				}),
				animate(".1s ease-in-out", style({
					opacity: 1,
					transform: "none"
				}))
			]),
			transition(":leave", [
				animate(".1s ease-in-out", style({
					opacity: 0,
					transform: "translateX(-30px)"
				}))
			])
		])
	]
})
export class AppNavComponent implements OnInit, OnDestroy
{
	private loadingSub:Subscription;

	loading:boolean = false;

	@Input() account:AccountInterface;
	
	@Input() open:boolean = false;
	@Output() openChange:EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(private App:AppService) {}

	ngOnInit() {
		this.loadingSub = this.App.loading.subscribe((loading) => {
			setTimeout(() => { this.loading = loading; });
		});
	}

	ngOnDestroy() {
		this.loadingSub.unsubscribe();
	}

	toggle(e:MouseEvent) {
		e.preventDefault();
		if (this.open) {
			this._close();
		} else {
			this._open();
		}
		
		this.openChange.emit(this.open);
	}

	_close() { 
		this.open = false;
	}

	_open() { 
		this.open = true;
	}
}