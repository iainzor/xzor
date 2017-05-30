import {Component} from "@angular/core";

import {AppService} from "../app.service";
import {routeAnimation} from "../ui/utilities/route-animation";

@Component({
	selector: "dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.css"],
	animations: [
		routeAnimation("dashboard")
	],
	host: {
		"[@dashboard]": ""
	}
})
export class DashboardComponent
{
	spin:boolean = false;
	query:string;

	spinLogo() {
		this.spin = !this.spin;
		setTimeout(() => {
			//this.spin = false;
		}, 100);
	}

	search() {
		this.spin = true;
		console.log(this.query);
	}
}