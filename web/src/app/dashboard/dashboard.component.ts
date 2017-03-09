import {Component} from "@angular/core";
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
{}