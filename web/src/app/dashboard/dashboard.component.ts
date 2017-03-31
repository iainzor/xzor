import {Component} from "@angular/core";

import {AppService} from "../app.service";
import {routeAnimation} from "../ui/utilities/route-animation";

@Component({
	selector: "dashboard",
	templateUrl: "./dashboard.component.html",
	animations: [
		routeAnimation("dashboard")
	],
	host: {
		"[@dashboard]": ""
	}
})
export class DashboardComponent
{
	private _loading:boolean = false;

	constructor(private App:AppService) {}

	toggle(e:MouseEvent) {
		e.preventDefault();

		this._loading = !this._loading;
		this.App.setLoading(this._loading);
	}
}