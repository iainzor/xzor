import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, NavigationStart} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {UINavService} from "./ui/ui-nav.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy 
{
	private routerSub:Subscription;

	constructor(private Router:Router, private Nav:UINavService) {}

	ngOnInit() {
		this.routerSub = this.Router.events.subscribe((e) => {
			if (e instanceof  NavigationStart) {
				this.Nav.clearSubNav();
			}
		});
	}

	ngOnDestroy() {
		this.routerSub.unsubscribe();
	}
}
