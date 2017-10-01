import {Component} from "@angular/core";
import {UINavPageInterface} from "../../ui/ui-nav/ui-nav-page.interface";
import {routeAnimation} from "../../ui/utilities/route-animation"

@Component({
	selector: "pages-teams-default",
	templateUrl: "./teams.component.html",
	styleUrls: ["./teams.component.css"],
	animations: [
		routeAnimation("routeAnimation")
	],
	host: {
		"[@routeAnimation]": ""
	}
})
export class TeamsComponent
{
	pages:UINavPageInterface[] = [
		{ path: ["/teams"], title: "All Teams", activeExact: true },
		{ path: ["/teams/my-teams"], title: "My Teams" },
		{ spacer: true },
		{ path: ["/teams", "new"], title: "Create Team" }
	]
}